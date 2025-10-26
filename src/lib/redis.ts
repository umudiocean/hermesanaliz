import { Redis } from '@upstash/redis';

// Initialize Redis client with Upstash credentials
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

// Cache TTL in seconds
export const CACHE_TTL = {
  TOKEN_ANALYSIS: 1800, // 30 minutes
  USER_INFO: 60, // 1 minute
  SETTINGS: 300, // 5 minutes
} as const;

// Cache key generators
export const cacheKeys = {
  tokenAnalysis: (address: string) => `token:analysis:${address.toLowerCase()}`,
  userInfo: (address: string) => `user:info:${address.toLowerCase()}`,
  contractSettings: () => `contract:settings`,
  statistics: () => `contract:statistics`,
} as const;

