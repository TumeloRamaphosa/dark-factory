// Pi Agent - The Planner
// Spawns sub-agent to create architecture, schemas, and plans

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

export async function spawnPiPlanner(
  prd: any,
  task: 'architecture' | 'database-schema' | 'api-design',
  context?: any
): Promise<string> {
  console.log(`[Pi Agent] Starting ${task} for: ${prd.title}`);
  
  const prompts = {
    architecture: `You are Pi, an expert software architect. 

Create a detailed architecture plan for: ${prd.title}

Tech Stack: ${prd.techStack?.join(', ')}
Features: ${prd.features?.join(', ')}

Output:
1. System architecture (monolithic/microservices)
2. Data flow diagram (text description)
3. Component breakdown
4. File structure
5. Key decisions

Keep it practical for a 2-week MVP.`,

    'database-schema': `You are Pi, a database architect.

Based on this PRD and architecture:
Title: ${prd.title}
${context?.plan ? `\nArchitecture: ${context.plan}` : ''}

Design the Prisma schema including:
1. All models with fields and types
2. Relations between models
3. Indexes for performance
4. Enum types if needed

Output valid Prisma schema code.`,

    'api-design': `You are Pi, an API designer.

Based on:
Title: ${prd.title}
${context?.plan ? `\nArchitecture: ${context.plan}` : ''}
${context?.schema ? `\nSchema: ${context.schema}` : ''}

Design REST/GraphQL APIs:
1. All endpoints with methods
2. Request/response schemas
3. Authentication requirements
4. Rate limiting strategy

Output in OpenAPI/Swagger format.`
  };

  try {
    // Try Ollama for free generation
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:7b',
        prompt: prompts[task],
        stream: false
      })
    });

    if (!response.ok) throw new Error('Ollama unavailable');
    
    const data = await response.json();
    console.log(`[Pi Agent] Completed ${task}`);
    return data.response;
    
  } catch (error) {
    console.log(`[Pi Agent] Ollama failed, using template: ${error}`);
    
    // Fallback templates
    const fallbacks: Record<string, string> = {
      architecture: `## Architecture for ${prd.title}

**Pattern**: Full-stack Next.js 15 App Router
**State**: React Server Components + Client islands
**Data**: Prisma + PostgreSQL
**Auth**: NextAuth.js
**Deploy**: Vercel

**Components**:
- Frontend: Next.js + Tailwind + shadcn/ui
- Backend: API Routes + Server Actions
- Database: PostgreSQL via Prisma
- Storage: Vercel Blob / S3`,

      'database-schema': `// Prisma Schema for ${prd.title}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Add domain-specific models here`,

      'api-design': `// API Design for ${prd.title}

// Auth
POST /api/auth/signin
POST /api/auth/signout

// Core Resources
GET    /api/items
POST   /api/items
GET    /api/items/:id
PATCH  /api/items/:id
DELETE /api/items/:id`
    };
    
    return fallbacks[task] || `# ${task} plan for ${prd.title}\n\nTemplate output.`;
  }
}
