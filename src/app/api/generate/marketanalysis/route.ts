import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import type { MarketAnalysis, Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint } = await req.json();

    const marketAnalysis = await generateJSON<MarketAnalysis>(
      `Analyze the market opportunity for this product idea.
      
      Idea: ${idea}
      Blueprint: ${JSON.stringify(blueprint)}
      
      Provide a JSON response with:
      - existingCompetitors: Array of 3-4 similar existing products (strings, e.g. "Figma", "Notion")
      - marketGap: What opportunity still exists in this space (string, 1-2 sentences)  
      - differentiation: Why this idea could stand out from competitors (string, 1-2 sentences)
      - opportunityScore: Market opportunity score from 0-10 (number)
      
      Be specific and realistic in your analysis.`
    );

    return NextResponse.json({ marketAnalysis });
  } catch (error) {
    console.error('Market Analysis generation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
