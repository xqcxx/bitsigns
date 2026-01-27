# BitSigns Deployment & Setup Guide

You have successfully upgraded the BitSigns codebase to support dynamic AI-generated Avatars using Gemini 2.5 and Pinata.

## 🚨 Critical Next Steps

### 1. Redeploy Smart Contracts
Since we modified `bitsign-nft.clar` to support dynamic metadata, **you must redeploy the contracts**.

1.  Open your terminal in the root `bitsigns` directory.
2.  Run:
    ```bash
    clarinet deploy --network mainnet
    ```
    *(Or testnet if you prefer testing first)*

### 2. Update Environment Variables
Edit your `web/.env.local` file with the following keys. **The app will not work without these.**

```env
# 1. NEW Contract Addresses (after redeployment)
NEXT_PUBLIC_BITSIGN_NFT_ADDRESS=[YOUR_NEW_CONTRACT_ADDRESS].bitsign-nft
# Update other contract addresses if they changed

# 2. Pinata Credentials (Required for Inngest)
# Get this from https://app.pinata.cloud/developers/api-keys
PINATA_JWT=your_pinata_jwt_token

# 3. Deployer Mnemonic (Server-side)
# Use the 24-word mnemonic for the wallet that DEPLOYED the contracts
# along with the account index (defaults to 0).
DEPLOYER_MNEMONIC="your 24 word mnemonic"
DEPLOYER_ACCOUNT_INDEX=0

# 4. Chainhook Secret
# A random string to secure your webhook endpoint.
CHAINHOOK_SECRET=your_random_secret_string
```

### 3. Register Chainhook (Web UI)
1.  Go to the [Chainhooks Web UI](https://platform.hiro.so/).
2.  Create a new Chainhook.
3.  Use the configuration from the `chainhook.json` file generated in the root directory.
4.  **Important:** Update the contract identifier in `chainhook.json` to match your **newly deployed contract address**.
5.  Set the webhook URL to your deployed app URL: `https://your-app-domain.com/api/webhooks/chainhook`.

### 4. Deploy Frontend
Push your changes to GitHub and deploy to Vercel (or your preferred host).
```bash
git push origin master
```
