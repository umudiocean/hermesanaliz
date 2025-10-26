# 🚀 Hermes AI Token Analyzer

AI-powered token analysis platform on BSC (Binance Smart Chain). Get comprehensive risk assessment, liquidity analysis, and holder distribution insights powered by blockchain data and artificial intelligence.

![Hermes AI Analyzer](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Scoring**: Advanced token analysis with 6-category scoring system
- 🔗 **Blockchain Integration**: Direct integration with BSC smart contracts
- 💎 **HERMES Token Access**: Token-gated platform with flexible pricing
- 🌍 **Multi-Language**: Support for 6 languages (EN, TR, ES, ZH, RU, JA)
- 📱 **Mobile Responsive**: Optimized for all devices
- 🎨 **Cyber Dark Theme**: Modern, animated UI with Framer Motion
- ⚡ **Real-time Data**: Live blockchain data via Moralis API
- 🔒 **Secure & Transparent**: Open-source smart contracts

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **RainbowKit** - Wallet connection
- **Wagmi** - React hooks for Ethereum
- **next-intl** - Internationalization

### Backend
- **Next.js API Routes** - Serverless functions
- **Moralis API** - Blockchain data provider
- **Vercel KV** - Redis cache (optional)

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **HermesAnalyzer** - Main analysis contract
- **HERMES Token** - ERC20 access token

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask or compatible Web3 wallet
- BSC Mainnet RPC access

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/umudiocean/hermesanaliz.git
cd hermesanaliz
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Moralis API
MORALIS_API_KEY=your_moralis_api_key

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Smart Contracts
NEXT_PUBLIC_HERMES_TOKEN_ADDRESS=0x9495ab3549338bf14ad2f86cbcf79c7b574bba37
NEXT_PUBLIC_ANALYZER_CONTRACT_ADDRESS=0x1653DED409F9FB61B38b18280483a0eAD562A57D
NEXT_PUBLIC_PAYMENT_WALLET=0xd88026A648C95780e3056ed98eD60E5105cc4863

# Network
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_NETWORK_NAME=BSC Mainnet

# Admin
ADMIN_SECRET=your_admin_secret

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### 4. Run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Token Scoring System

The platform analyzes tokens across 6 categories (0-100 total):

### 1. Liquidity & Volume (25 points)
- Total liquidity depth
- 24h trading volume
- Volume/Liquidity ratio

### 2. Holder Analysis (20 points)
- Total holder count
- Top 10 whale concentration
- Distribution quality

### 3. Contract Security (20 points)
- Contract verification
- Ownership status
- Mint function check
- Honeypot detection

### 4. Activity & Age (15 points)
- Token age
- Daily transfers
- Active trader count

### 5. Price Performance (10 points)
- Price stability
- 7-day trend
- Volatility metrics

### 6. DEX Presence (10 points)
- Number of DEX listings
- Major DEX presence
- Liquidity distribution

### Risk Levels
- **76-100**: ✅ Excellent (Low risk)
- **50-75**: 👍 Good (Moderate risk)
- **30-49**: ⚠️ Risky (High risk)
- **10-29**: 🚨 High Risk (Very high risk)

## 🔐 Smart Contract Addresses

| Contract | Address |
|----------|---------|
| HERMES Token | `0x9495ab3549338bf14ad2f86cbcf79c7b574bba37` |
| HermesAnalyzer | `0x1653DED409F9FB61B38b18280483a0eAD562A57D` |
| Payment Wallet | `0xd88026A648C95780e3056ed98eD60E5105cc4863` |

### Contract Settings
- **Minimum Balance**: 1,000,000,000 HERMES (1B)
- **Analysis Price**: 1,000,000 HERMES (1M)
- **Daily Free Limit**: 2 analyses

## 🌍 Supported Languages

- 🇬🇧 English (Default)
- 🇹🇷 Türkçe
- 🇪🇸 Español
- 🇨🇳 中文 (Chinese)
- 🇷🇺 Русский (Russian)
- 🇯🇵 日本語 (Japanese)

## 📱 Mobile Support

The platform is fully responsive and optimized for:
- iOS (Safari, Chrome)
- Android (Chrome, Firefox)
- Tablets (iPad, Android tablets)

## 🎨 Design System

### Colors
- **Background**: `#0a0b0d` (Deep black)
- **Card**: `#18181b` (Dark gray)
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#22c55e` (Green)
- **Warning**: `#eab308` (Yellow)
- **Danger**: `#ef4444` (Red)

### Typography
- **Font**: Inter (System default)
- **Weights**: 400, 500, 600, 700, 800

## 🔧 Admin Panel

Access the admin panel at `/admin` with the admin secret.

### Admin Features
- View platform statistics
- Update minimum balance requirement
- Change analysis pricing
- Modify daily free limit
- Emergency pause/unpause contract

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Vercel KV Setup

1. Enable Vercel KV in your project
2. Environment variables will be auto-populated
3. Cache duration: 30-60 minutes per token

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Website**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Twitter**: [Coming Soon]
- **Telegram**: [Coming Soon]

## ⚠️ Disclaimer

This platform provides analysis tools and should not be considered financial advice. Always do your own research before investing in any cryptocurrency.

---

**Built with 💜 by the Hermes Team**

