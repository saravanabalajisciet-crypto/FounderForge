import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import type { LaunchPreview, Blueprint } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { idea, blueprint, improvement } = await req.json();

    const launchPreview = await generateJSON<LaunchPreview>(
      `Create a detailed MVP UI/UX preview for this product concept.
      
      Idea: ${idea}
      Blueprint: ${JSON.stringify(blueprint)}
      Improved Features: ${improvement?.improvedBlueprint?.coreFeatures?.join(', ') || 'N/A'}
      
      Provide a JSON response with:
      - appName: Creative app name (string)
      - tagline: Concise tagline (string, max 10 words)  
      - colorScheme: Design color scheme description (string, e.g. "Modern Blue & Purple with accent Cyan")
      - homeScreenLayout: Description of home screen structure (string, 2-3 sentences)
      - navigationStructure: Array of 4-5 main navigation tabs/sections (strings)
      - keyComponents: Array of 4-5 key UI components (strings, e.g. "Dashboard Card", "Progress Badge")
      - dashboardSections: Array of 3-4 dashboard sections if applicable (strings)
      - userJourney: Array of 4-5 key user interaction flows (strings)
      
      Think about what a real MVP would look like for this product. Be specific about UI elements.`
    );

    return NextResponse.json({ launchPreview });
  } catch (error) {
    console.error('Launch Preview generation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
