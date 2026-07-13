import { NextRequest, NextResponse } from 'next/server';
import { generatePRD } from '@/lib/bmad';

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();
    
    if (!idea || idea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a more detailed idea (at least 10 characters)' },
        { status: 400 }
      );
    }

    // Generate PRD using Ollama (free, local)
    const prd = await generatePRD(idea);
    
    return NextResponse.json({ 
      success: true, 
      prd,
      message: 'PRD generated successfully. Review and click "Start Building" when ready.'
    });
  } catch (error) {
    console.error('BMAD Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD' },
      { status: 500 }
    );
  }
}
