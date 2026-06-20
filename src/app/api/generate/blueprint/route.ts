import { NextRequest, NextResponse } from 'next/server';
import { generateBlueprint, generateInspiredBlueprint } from '@/lib/gemini';
import type { InspirationAnalysis } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.mode === 'inspiration') {
      const { analysis, customPrompt } = body as {
        analysis: InspirationAnalysis;
        customPrompt: string;
      };
      const blueprint = await generateInspiredBlueprint(analysis, customPrompt);
      return NextResponse.json({ blueprint });
    }

    const { idea } = body as { idea: string };
    if (!idea?.trim()) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const blueprint = await generateBlueprint(idea);
    return NextResponse.json({ blueprint });
  } catch (err) {
    console.error('Blueprint generation error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate blueprint';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
