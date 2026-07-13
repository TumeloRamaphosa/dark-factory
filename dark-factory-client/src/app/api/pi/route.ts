import { NextRequest, NextResponse } from 'next/server';
import { spawnPiPlanner } from '@/lib/pi-agent';

export async function POST(req: NextRequest) {
  try {
    const { prd, task, context } = await req.json();
    
    if (!prd || !task) {
      return NextResponse.json(
        { error: 'Missing required fields: prd, task' },
        { status: 400 }
      );
    }

    // Spawn Pi agent for planning/architecture
    const result = await spawnPiPlanner(prd, task, context);
    
    return NextResponse.json({ 
      success: true, 
      result,
      agent: 'pi',
      task
    });
  } catch (error) {
    console.error('Pi Agent Error:', error);
    return NextResponse.json(
      { error: 'Pi agent failed to plan' },
      { status: 500 }
    );
  }
}
