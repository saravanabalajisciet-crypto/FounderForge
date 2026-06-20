import { NextRequest, NextResponse } from 'next/server';
import { generateImprovement } from '@/lib/gemini';
import type { Blueprint, Persona } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint, personas } = await req.json() as {
      idea: string;
      blueprint: Blueprint;
      personas: Persona[];
    };
    const improvement = await generateImprovement(idea, blueprint, personas);
    return NextResponse.json({ improvement });
  } catch (err) {
    console.error('Improvement generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate improvements';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
