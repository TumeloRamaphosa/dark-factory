// BMAD - Build Me A Dark PRD Generator
// Uses Ollama for free, local AI generation

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

export interface PRD {
  id: string;
  title: string;
  summary: string;
  techStack: string[];
  features: string[];
  timeline: string;
  price: number;
  status: 'generated' | 'paid' | 'building' | 'complete';
  createdAt: string;
}

export async function generatePRD(idea: string): Promise<PRD> {
  const prompt = `Generate a product requirements document for: "${idea}"

Respond in this exact JSON format:
{
  "title": "App name",
  "summary": "One paragraph description",
  "techStack": ["Next.js 15", "TypeScript", "3 more relevant tech"],
  "features": ["5 key features"],
  "timeline": "2-3 weeks estimate",
  "architecture": "Brief system design"
}

Keep it realistic for a $29 MVP build.`;

  try {
    // Try Ollama first (free, local)
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:1.5b',
        prompt: prompt,
        stream: false,
        format: 'json'
      })
    });

    if (!response.ok) throw new Error('Ollama failed');
    
    const data = await response.json();
    const aiResponse = JSON.parse(data.response);
    
    return {
      id: generateId(),
      title: aiResponse.title || idea,
      summary: aiResponse.summary || `Build a ${idea} platform`,
      techStack: aiResponse.techStack || ['Next.js 15', 'TypeScript', 'Tailwind', 'Prisma'],
      features: aiResponse.features || ['Authentication', 'Dashboard', 'API'],
      timeline: aiResponse.timeline || '2-3 weeks',
      price: 29,
      status: 'generated',
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    // Fallback to deterministic generation
    console.log('Ollama failed, using fallback:', error);
    
    return {
      id: generateId(),
      title: idea,
      summary: `Build a ${idea} with modern web technologies`,
      techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      features: [
        'User authentication & profiles',
        'Responsive dashboard UI',
        'Real-time data updates',
        'Payment integration ready',
        'Admin panel'
      ],
      timeline: '2-3 weeks',
      price: 29,
      status: 'generated',
      createdAt: new Date().toISOString()
    };
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
