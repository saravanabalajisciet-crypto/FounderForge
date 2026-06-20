import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import type { CeoReview, Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint, feedback } = await req.json();

    const ceoReview = await generateJSON<CeoReview>(
      `You are an experienced startup CEO, product strategist, and seasoned investor.
      
      Analyze this product idea and provide executive-level feedback:
      
      Idea: ${idea}
      Blueprint: ${JSON.stringify(blueprint)}
      User Feedback Summary: ${feedback}
      
      Provide a JSON response with:
      - whatILike: Array of 3-4 positive aspects (strings)
      - biggestRisks: Array of 3-4 potential risks (strings)  
      - mvpRecommendation: Array of 3-4 features for MVP (strings)
      - growthPotential: Brief description of market opportunity (string, 1-2 sentences)
      - founderScore: Score from 0-10 (number)
      
      Make the response sound like authentic investor feedback. Be critical but constructive.`
    );

    return NextResponse.json({ ceoReview });
  } catch (error) {
    console.error('CEO Review generation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
