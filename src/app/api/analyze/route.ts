import { NextRequest, NextResponse } from 'next/server';
import { analyzeInspirationImage } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { base64Image, mimeType } = await req.json() as {
      base64Image: string;
      mimeType: string;
    };

    if (!base64Image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const analysis = await analyzeInspirationImage(base64Image, mimeType || 'image/jpeg');
    return NextResponse.json({ analysis });
  } catch (err) {
    console.error('Image analysis error:', err);
    const message = err instanceof Error ? err.message : 'Failed to analyze image';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
