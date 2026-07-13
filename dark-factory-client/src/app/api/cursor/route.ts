import { NextRequest, NextResponse } from 'next/server';
import { spawnCursorCoder } from '@/lib/cursor-agent';

export async function POST(req: NextRequest) {
  try {
    const { prd, task, plan, schema, apiDesign, frontend, backend } = await req.json();
    
    if (!prd || !task) {
      return NextResponse.json(
        { error: 'Missing required fields: prd, task' },
        { status: 400 }
      );
    }

    // Spawn Cursor agent for coding
    const result = await spawnCursorCoder({
      prd,
      task,
      plan,
      schema,
      apiDesign,
      frontend,
      backend
    });
    
    return NextResponse.json({ 
      success: true, 
      result,
      agent: 'cursor',
      task
    });
  } catch (error) {
    console.error('Cursor Agent Error:', error);
    return NextResponse.json(
      { error: 'Cursor agent failed to code' },
      { status: 500 }
    );
  }
}
