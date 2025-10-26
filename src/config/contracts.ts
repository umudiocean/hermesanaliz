export const CONTRACTS = {
  HERMES_TOKEN: process.env.NEXT_PUBLIC_HERMES_TOKEN_ADDRESS as `0x${string}`,
  ANALYZER: process.env.NEXT_PUBLIC_ANALYZER_CONTRACT_ADDRESS as `0x${string}`,
  PAYMENT_WALLET: process.env.NEXT_PUBLIC_PAYMENT_WALLET as `0x${string}`,
};

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '56');

export const BSC_MAINNET = {
  id: 56,
  name: 'BSC Mainnet',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://bsc-dataseed1.binance.org'] },
    public: { http: ['https://bsc-dataseed1.binance.org'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
} as const;

