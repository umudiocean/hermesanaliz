import { NextRequest, NextResponse } from 'next/server';
import { calculateTokenScore } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tokenAddress, userAddress } = body;

    if (!tokenAddress || !userAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Calculate token score using Moralis API
    const score = await calculateTokenScore(tokenAddress);

    return NextResponse.json({ score });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}

