import Moralis from 'moralis';
import type { TokenScore } from '@/types';

// Initialize Moralis if not already initialized
let moralisInitialized = false;

async function initMoralis() {
  if (!moralisInitialized && !Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
    moralisInitialized = true;
  }
}

export async function calculateTokenScore(tokenAddress: string): Promise<TokenScore> {
  await initMoralis();

  try {
    // Fetch token metadata
    let tokenData: any = {
      name: 'Unknown Token',
      symbol: 'UNKNOWN',
      decimals: '18',
    };

    try {
      const metadata = await Moralis.EvmApi.token.getTokenMetadata({
        chain: '0x38', // BSC Mainnet
        addresses: [tokenAddress],
      });
      tokenData = metadata.raw[0] || tokenData;
    } catch (e) {
      console.log('Metadata fetch failed:', e);
    }

    // Fetch token price (mock data for now)
    const priceUsd = Math.random() * 10;

    // Fetch top holders (mock data for now)
    let holderCount = Math.floor(Math.random() * 1000) + 100;
    let topHoldersPercentage = Math.random() * 60 + 20; // 20-80%

    // Mock liquidity and volume data (in production, fetch from DEX APIs)
    const totalLiquidity = Math.random() * 500000 + 50000; // $50k-$550k
    const volume24h = totalLiquidity * (Math.random() * 0.5 + 0.2); // 20-70% of liquidity

    // Calculate scores for each category
    const liquidityScore = calculateLiquidityScore(totalLiquidity, volume24h);
    const holdersScore = calculateHoldersScore(holderCount, topHoldersPercentage);
    const securityScore = calculateSecurityScore(tokenData);
    const activityScore = calculateActivityScore();
    const performanceScore = calculatePerformanceScore(priceUsd);
    const dexScore = calculateDexScore();

    const overallScore =
      liquidityScore +
      holdersScore +
      securityScore +
      activityScore +
      performanceScore +
      dexScore;

    return {
      address: tokenAddress,
      name: tokenData.name || 'Unknown',
      symbol: tokenData.symbol || 'UNKNOWN',
      overallScore: Math.round(overallScore),
      categories: {
        liquidity: Math.round(liquidityScore),
        holders: Math.round(holdersScore),
        security: Math.round(securityScore),
        activity: Math.round(activityScore),
        performance: Math.round(performanceScore),
        dex: Math.round(dexScore),
      },
      details: {
        totalLiquidity,
        volume24h,
        holderCount,
        topHoldersPercentage,
        tokenAge: 30, // Mock data
        dailyTransfers: Math.floor(Math.random() * 1000) + 100,
        priceUsd,
        dexCount: Math.floor(Math.random() * 3) + 1,
      },
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Token scoring error:', error);
    throw new Error('Failed to analyze token');
  }
}

function calculateLiquidityScore(liquidity: number, volume: number): number {
  let score = 0;

  // Liquidity score (0-12)
  if (liquidity > 250000) score += 12;
  else if (liquidity > 50000) score += 8;
  else if (liquidity > 10000) score += 5;
  else score += 2;

  // Volume score (0-8)
  const volumeRatio = volume / liquidity;
  if (volumeRatio > 0.5) score += 8;
  else if (volumeRatio > 0.2) score += 5;
  else score += 2;

  // Volume/Liquidity ratio (0-5)
  if (volumeRatio > 0.5) score += 5;
  else if (volumeRatio > 0.3) score += 3;
  else score += 1;

  return Math.min(score, 25);
}

function calculateHoldersScore(holders: number, topPercentage: number): number {
  let score = 0;

  // Holder count (0-8)
  if (holders > 1000) score += 8;
  else if (holders > 100) score += 5;
  else score += 2;

  // Whale concentration (0-12)
  if (topPercentage < 30) score += 12;
  else if (topPercentage < 50) score += 7;
  else score += 3;

  return Math.min(score, 20);
}

function calculateSecurityScore(tokenData: any): number {
  // In production, use security audit APIs
  // For now, return a score based on basic checks
  let score = 15; // Base score

  // Add score for verified contract (mock)
  if (tokenData.verified_contract) score += 5;

  return Math.min(score, 20);
}

function calculateActivityScore(): number {
  // In production, fetch real activity data
  return Math.floor(Math.random() * 5) + 10; // 10-15 points
}

function calculatePerformanceScore(priceUsd: number): number {
  // In production, calculate based on price history
  if (priceUsd > 0) return Math.floor(Math.random() * 3) + 7; // 7-10 points
  return 5;
}

function calculateDexScore(): number {
  // In production, check DEX presence
  return Math.floor(Math.random() * 3) + 7; // 7-10 points
}

