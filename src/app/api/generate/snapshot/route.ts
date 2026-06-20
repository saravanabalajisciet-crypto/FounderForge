import { NextRequest, NextResponse } from 'next/server';
import { generateFutureSnapshot } from '@/lib/gemini';
import type { Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, improvedBlueprint } = await req.json() as {
      idea: string;
      improvedBlueprint: Blueprint;
    };
    const snapshot = await generateFutureSnapshot(idea, improvedBlueprint);
    return NextResponse.json({ snapshot });
  } catch (err) {
    console.error('Snapshot generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate future snapshot';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
