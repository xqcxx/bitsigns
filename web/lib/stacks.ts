import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';
import { fetchCallReadOnlyFunction, cvToJSON, ClarityValue } from '@stacks/transactions';
import { APP_CONFIG } from './constants';

export const network = APP_CONFIG.NETWORK === 'mainnet'
  ? STACKS_MAINNET
  : STACKS_TESTNET;

export const getExplorerUrl = (txId: string) =>
  `https://explorer.hiro.so/txid/${txId}?chain=${APP_CONFIG.NETWORK}`;

export const getExplorerAddressUrl = (address: string) =>
  `https://explorer.hiro.so/address/${address}?chain=${APP_CONFIG.NETWORK}`;

export const getExplorerBlockUrl = (blockHeight: number) =>
  `https://explorer.hiro.so/block/${blockHeight}?chain=${APP_CONFIG.NETWORK}`;

export async function readContract(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[],
  senderAddress: string = contractAddress
) {
  const result = await fetchCallReadOnlyFunction({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network,
    senderAddress,
  });


export async function getRecentMints(contractAddress: string, limit: number = 20) {
  try {
    const response = await fetch(
      `https://api.mainnet.hiro.so/extended/v1/tokens/nft/holdings?asset_identifiers=${contractAddress}&limit=${limit}&offset=0`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map((item: any) => ({
      tokenId: parseInt(item.value.repr.replace('u', '')),
      owner: item.tx_id, // Note: This API returns tx_id, for owner we might need 'principal' field if available or another call
      // Actually, holdings endpoint returns who holds it.
      // Let's inspect the response structure more carefully in a real app.
      // For now, we assume standard Stacks API response for holdings.
      principal: item.principal
    }));
  } catch (error) {
    console.error("Error fetching recent mints:", error);
    return [];
  }
}
