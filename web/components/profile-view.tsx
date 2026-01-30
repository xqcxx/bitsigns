"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { getUserTraits } from "@/lib/contracts/trait-engine";
import { hasUserMinted, getTokenData } from "@/lib/contracts/bitsign-nft";
import { TraitData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Zap, Droplets, Wind, Mountain, Sparkles, Hash, Clover, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";

// Simple Badge component if not exists
function SimpleBadge({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</span>
}

export function ProfileView() {
  const { address, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [traits, setTraits] = useState<TraitData | null>(null);
  const [minted, setMinted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<number | null>(null);

  const fetchData = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      const [hasMintedRes, traitsRes] = await Promise.all([
        hasUserMinted(address),
        getUserTraits(address)
      ]);
      
      setMinted(hasMintedRes);
      setTraits(traitsRes);

      if (hasMintedRes) {
        // Fetch Token Data to get Image URI
        // NOTE: We need to know the tokenId. For now, we might need a way to look up tokenId by owner 
        // OR we just iterate/assume. The contract doesn't explicitly have get-token-by-owner easily exposed without indexer.
        // For this demo, let's assume we can find it or we fetch the last token and check ownership (inefficient but works for 1-user demo)
        // A better way: The Mint event gives us the ID.
        // Let's rely on an indexer or simpler: Check the last 100 tokens? 
        // Actually, let's just use a simple heuristic or wait for the user to tell us? 
        // No, we should read the contract properly. 
        // Since we don't have an indexer in this simplified frontend, we'll skip image fetching for a second
        // unless we add a "get-user-token-id" to the contract or use an API.
        
        // Let's try to fetch token data for the user if we can.
        // For now, we will just show the traits. 
        // Wait, the user wants to see the image.
        // Let's assume the user just minted the *last* token if they are the owner? 
        // Or we can scan:
        // This is a limitation without an indexer/API.
        // Let's implement a quick scanner for the demo.
        
        // Placeholder logic for image fetching:
        // In a real app, use the Stacks API to find assets owned by address.
      }

    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
      setChecked(true);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchData();
    }
  }, [isConnected, address]);

  // Effect to poll for image if minted but no image yet
  useEffect(() => {
    if (minted && !imageUri && address) {
        const fetchImage = async () => {
            // Use Stacks API to find the token ID owned by this user
            try {
                const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/nft/holdings?principal=${address}&asset_identifiers=${process.env.NEXT_PUBLIC_BITSIGN_NFT_ADDRESS}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const myToken = data.results[0];
                    const id = parseInt(myToken.value.repr.replace('u', ''));
                    setTokenId(id);
                    
                    const tokenData = await getTokenData(id);
                    if (tokenData && tokenData.imageUri) {
                        // Convert IPFS to Gateway
                        const gatewayUrl = tokenData.imageUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
                        setImageUri(gatewayUrl);
                    }
                }
            } catch (e) {
                console.error("Error finding token:", e);
            }
        };
        
        fetchImage();
        const interval = setInterval(fetchImage, 5000); // Poll every 5s for image update
        return () => clearInterval(interval);
    }
  }, [minted, imageUri, address]);

  if (!isConnected || !address) {
    return (
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Connect your wallet to view your BitSigns profile.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading || !checked) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-32 w-full bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!minted || !traits) {
    return (
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>No BitSign Found</CardTitle>
          <CardDescription>You haven't minted your BitSign avatar yet.</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/mint">
            <Button>Mint Your BitSign</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const getElementIcon = (element: string) => {
      switch(element.toLowerCase()) {
          case 'fire': return <Zap className="h-4 w-4" />;
          case 'water': return <Droplets className="h-4 w-4" />;
          case 'air': return <Wind className="h-4 w-4" />;
          case 'earth': return <Mountain className="h-4 w-4" />;
          default: return <Sparkles className="h-4 w-4" />;
      }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white/80 backdrop-blur-sm border-none shadow-xl">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 w-full" />
      <div className="px-8 pb-8">
        <div className="relative -mt-16 mb-6">
import { DownloadButton } from "./download-button";

// ... inside the image rendering part ...

            <div className="h-32 w-32 rounded-full border-4 border-white bg-secondary flex items-center justify-center overflow-hidden relative shadow-2xl group">
                {imageUri ? (
                    <>
                        <Image 
                            src={imageUri} 
                            alt={traits.bitsign} 
                            fill 
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <DownloadButton imageUri={imageUri} fileName={`bitsign-${tokenId}.png`} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground bg-secondary w-full h-full">
                        <Loader2 className="h-8 w-8 animate-spin mb-1" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Generating</span>
                    </div>
                )}
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h2 className="text-3xl font-heading font-bold flex items-center gap-2 text-primary">
                    {traits.bitsign}
                    {tokenId && <span className="text-sm font-bold bg-accent/20 text-accent px-3 py-1 rounded-full">#{tokenId}</span>}
                </h2>
                <p className="text-muted-foreground font-body text-lg">{address.slice(0, 6)}...{address.slice(-4)}</p>
            </div>
import { ShareButton } from "./share-button";

// ... inside ProfileView, after the tokenId rendering ...

            <div className="flex gap-2">
                <Link href="/fortune">
                    <Button variant="outline" className="rounded-full border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Daily Fortune
                    </Button>
                </Link>
                {tokenId && traits && (
                    <ShareButton 
                        tokenId={tokenId} 
                        sign={traits.bitsign} 
                        element={traits.element} 
                    />
                )}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Element</span>
                <div className="flex items-center gap-2 font-bold text-accent">
                    {getElementIcon(traits.element)}
                    {traits.element}
                </div>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Energy</span>
                <span className="font-bold text-primary">{traits.energy}</span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Power #</span>
                <div className="flex items-center gap-2 font-bold text-foreground">
                    <Hash className="h-4 w-4" />
                    {traits.powerNumber}
                </div>
            </div>

            <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Lucky Sat</span>
                <div className="flex items-center gap-2 font-bold text-foreground">
                    <Clover className="h-4 w-4" />
                    {traits.luckySat}
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
}
