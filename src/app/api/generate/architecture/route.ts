import { NextRequest, NextResponse } from 'next/server';
import { generateArchitecture } from '@/lib/gemini';
import type { Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint } = await req.json() as { idea: string; blueprint: Blueprint };
    const architecture = await generateArchitecture(idea, blueprint);
    return NextResponse.json({ architecture });
  } catch (err) {
    console.error('Architecture generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate architecture';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
