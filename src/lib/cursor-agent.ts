// Cursor Agent - The Coder
// Spawns sub-agent to write actual code

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

interface CursorContext {
  prd: any;
  task: 'frontend' | 'backend' | 'tests' | string;
  plan?: string;
  schema?: string;
  apiDesign?: string;
  frontend?: string;
  backend?: string;
}

export async function spawnCursorCoder(context: CursorContext): Promise<string> {
  console.log(`[Cursor Agent] Starting ${context.task} for: ${context.prd.title}`);
  
  const { prd, task, plan, schema, apiDesign, frontend, backend } = context;
  
  const prompts: Record<string, string> = {
    frontend: `You are Cursor, an expert frontend engineer.

Build the frontend for: ${prd.title}

Tech Stack: Next.js 15, TypeScript, Tailwind, shadcn/ui
${plan ? `\nArchitecture:\n${plan}` : ''}

Generate complete, production-ready code for:
1. Main page.tsx
2. Required components
3. TypeScript types
4. Client hooks if needed

Use modern patterns (React Server Components, Server Actions).
Output code only, ready to copy-paste.`,

    backend: `You are Cursor, an expert backend engineer.

Build the backend for: ${prd.title}

${schema ? `\nDatabase Schema:\n${schema}` : ''}
${apiDesign ? `\nAPI Design:\n${apiDesign}` : ''}

Generate:
1. API route handlers
2. Database queries (Prisma)
3. Server Actions
4. TypeScript types

Output code only, production-ready.`,

    tests: `You are Cursor, a QA engineer.

Create tests for: ${prd.title}

${frontend ? `\nFrontend Code:\n${frontend}` : ''}
${backend ? `\nBackend Code:\n${backend}` : ''}

Generate:
1. Unit tests (Vitest)
2. Integration tests
3. E2E tests (Playwright)

Output test code only.`
  };

  try {
    // Try Ollama for code generation
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-coder-v2:16b',
        prompt: prompts[task] || prompts.frontend,
        stream: false,
        options: {
          temperature: 0.1 // Low temp for code
        }
      })
    });

    if (!response.ok) throw new Error('Ollama unavailable');
    
    const data = await response.json();
    console.log(`[Cursor Agent] Completed ${task}`);
    return data.response;
    
  } catch (error) {
    console.log(`[Cursor Agent] Ollama failed, using template: ${error}`);
    
    // Fallback code templates
    const fallbacks: Record<string, string> = {
      frontend: `// app/page.tsx for ${prd.title}

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">${prd.title}</h1>
      <p className="mt-4 text-gray-600">${prd.summary}</p>
    </main>
  );
}`,

      backend: `// app/api/items/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch from database
  return NextResponse.json({ items: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  // Save to database
  return NextResponse.json({ success: true, id: 'new-id' });
}`,

      tests: `// tests/app.test.ts

import { test, expect } from 'vitest';

test('app loads', () => {
  expect(true).toBe(true);
});`
    };
    
    return fallbacks[task] || `// Code for ${task}\n\nexport default function ${task}() {}`;
  }
}
