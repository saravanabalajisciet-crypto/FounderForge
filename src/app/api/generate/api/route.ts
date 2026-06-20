import { NextRequest, NextResponse } from 'next/server';
import { generateAPI } from '@/lib/gemini';
import type { Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint } = await req.json() as { idea: string; blueprint: Blueprint };
    const api = await generateAPI(idea, blueprint);
    return NextResponse.json({ api });
  } catch (err) {
    console.error('API generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate API endpoints';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
