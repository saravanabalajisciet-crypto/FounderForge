import { NextRequest, NextResponse } from 'next/server';
import { generateDatabase } from '@/lib/gemini';
import type { Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint } = await req.json() as { idea: string; blueprint: Blueprint };
    const database = await generateDatabase(idea, blueprint);
    return NextResponse.json({ database });
  } catch (err) {
    console.error('Database generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate database schema';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
