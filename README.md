# BitSigns

**Your Bitcoin birthday reveals your destiny.**

BitSigns is an AI-generated astrology system built on Stacks where your wallet's first Bitcoin block interaction determines your "BitSign" - a zodiac-like personality type. AI generates unique avatar NFTs based on your traits, and daily fortunes are derived from current Bitcoin block data.

## Features

- **AI-Generated NFTs** - Unique avatars created by Google Gemini based on your Bitcoin birthday
- **Daily Fortunes** - Personalized predictions based on current Bitcoin block data
- **Compatibility Checking** - See how well you match with other wallets
- **Tradeable Traits** - SIP-013 semi-fungible tokens for your personality traits

## Getting Started

### Prerequisites

- Node.js 18+
- Clarinet (for contract development)
- A Stacks wallet (Leather recommended)

### Installation

```bash
# Install dependencies
cd web && npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Development

```bash
# Start the Next.js development server
cd web && npm run dev
```

## Project Structure

```
bitsigns/
├── contracts/           # Clarity smart contracts
│   ├── trait-engine.clar
│   ├── bitsign-nft.clar
│   ├── fortune-oracle.clar
│   ├── compatibility.clar
│   ├── trait-token.clar
│   └── treasury.clar
├── web/                 # Next.js frontend
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   ├── lib/            # Utilities
│   └── hooks/          # Custom hooks
└── README.md
```

## Contracts

| Contract | Description |
|----------|-------------|
| `trait-engine` | Generates personality traits from Bitcoin block data |
| `bitsign-nft` | SIP-009 NFT with dynamic AI-generated metadata |
| `fortune-oracle` | Generates daily fortunes from block data |
| `compatibility` | Checks wallet compatibility based on BitSigns |
| `trait-token` | SIP-013 tradeable personality traits |
| `treasury` | Protocol revenue management |

## Environment Variables

```env
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST...
GEMINI_API_KEY=...
PINATA_API_KEY=...
PINATA_SECRET_KEY=...
```

## Deployment

### Frontend

Deploy to Vercel:

```bash
cd web
vercel deploy
```

### Contracts

Deploy to testnet:

```bash
clarinet deploy --testnet
```

## Built with Clarity 4

This project uses Clarity 4 features including:
- `stacks-block-time` for time-based features
- `burn-block-height` for Bitcoin block access
- Native SIP-009 and SIP-013 token standards

## License

MIT
