import { NextRequest, NextResponse } from 'next/server';
import { generatePersonas } from '@/lib/gemini';
import type { Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint } = await req.json() as { idea: string; blueprint: Blueprint };
    const personas = await generatePersonas(idea, blueprint);
    return NextResponse.json({ personas });
  } catch (err) {
    console.error('Personas generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate personas';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
