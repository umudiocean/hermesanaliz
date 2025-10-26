export interface TokenScore {
  address: string;
  name: string;
  symbol: string;
  overallScore: number;
  categories: {
    liquidity: number;
    holders: number;
    security: number;
    activity: number;
    performance: number;
    dex: number;
  };
  details: {
    totalLiquidity: number;
    volume24h: number;
    holderCount: number;
    topHoldersPercentage: number;
    tokenAge: number;
    dailyTransfers: number;
    priceUsd: number;
    dexCount: number;
  };
  timestamp: number;
}

export interface UserInfo {
  eligible: boolean;
  hermesBalance: string;
  freeRemaining: number;
  totalAnalyses: number;
  nextResetTime: number;
}

export interface ContractSettings {
  minBalance: string;
  price: string;
  freeLimit: number;
  wallet: string;
  paused: boolean;
}

export interface PlatformStatistics {
  totalAnalyses: number;
  totalRevenue: string;
}

export interface MoralisTokenData {
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: string;
  logo?: string;
  totalSupply?: string;
}

export interface MoralisTokenPrice {
  usdPrice: number;
  nativePrice?: {
    value: string;
    decimals: number;
  };
}

export interface MoralisTokenOwner {
  owner: string;
  balance: string;
  percentage: number;
}

