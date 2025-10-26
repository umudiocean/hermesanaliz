import { NextRequest, NextResponse } from 'next/server';
import { calculateTokenScore } from '@/lib/scoring';
import { redis, cacheKeys, CACHE_TTL } from '@/lib/redis';
import type { TokenScore } from '@/types';

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

    // Check cache first
    const cacheKey = cacheKeys.tokenAnalysis(tokenAddress);
    
    try {
      const cached = await redis.get<TokenScore>(cacheKey);
      if (cached) {
        console.log(`✅ Cache HIT for ${tokenAddress}`);
        return NextResponse.json({ score: cached, cached: true });
      }
    } catch (cacheError) {
      console.log('Cache read failed, proceeding with API call:', cacheError);
    }

    console.log(`🔄 Cache MISS for ${tokenAddress} - Fetching from Moralis...`);

    // Calculate token score using Moralis API
    const score = await calculateTokenScore(tokenAddress);

    // Store in cache with TTL
    try {
      await redis.setex(cacheKey, CACHE_TTL.TOKEN_ANALYSIS, score);
      console.log(`💾 Cached for ${CACHE_TTL.TOKEN_ANALYSIS}s`);
    } catch (cacheError) {
      console.log('Cache write failed (non-critical):', cacheError);
    }

    return NextResponse.json({ score, cached: false });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}

