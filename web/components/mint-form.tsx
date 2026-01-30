"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { APP_CONFIG, CONTRACTS, MINT_PRICE } from "@/lib/constants";
import { parseContractId } from "@/lib/utils";
import { uintCV } from "@stacks/transactions";
import { Loader2, Pickaxe } from "lucide-react";

export function MintForm() {
  const { isConnected, connect, address } = useWallet();
  const [blockHeight, setBlockHeight] = React.useState<string>("");
  const [birthDate, setBirthDate] = React.useState<string>("");
  const [isCalculating, setIsCalculating] = React.useState(false);

  const GENESIS_DATE = new Date("2009-01-03").getTime();
  const BLOCK_TIME_MINUTES = 10;

  const calculateBlockHeight = (dateStr: string) => {
    if (!dateStr) return;
    
    setIsCalculating(true);
    const date = new Date(dateStr).getTime();
    
    if (date < GENESIS_DATE) {
      setBlockHeight("0"); // Pre-Bitcoin is block 0
    } else {
      const diffMinutes = (date - GENESIS_DATE) / (1000 * 60);
      const height = Math.floor(diffMinutes / BLOCK_TIME_MINUTES);
      setBlockHeight(height.toString());
    }
    setIsCalculating(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    calculateBlockHeight(e.target.value);
  };

import { toast } from "sonner";

// ...

  const handleMint = async () => {
    if (!blockHeight) return;

    const { address: contractAddress, name: contractName } = parseContractId(CONTRACTS.BITSIGN_NFT);

    try {
      // Dynamic import to avoid SSR issues
      const { request } = await import("@stacks/connect");

      const response = await request("stx_callContract", {
        contract: `${contractAddress}.${contractName}`,
        functionName: "mint",
        functionArgs: [uintCV(Number(blockHeight))],
        postConditionMode: "allow", // 'allow' or 'deny'
        postConditions: [], // We could add STX transfer PC here
        network: APP_CONFIG.NETWORK as any,
      });

      if (response && response.txid) {
          toast.success("Mint transaction broadcasted!", {
            description: "Your BitSign is being forged on the blockchain. Check the explorer.",
            action: {
                label: "View Explorer",
                onClick: () => window.open(`https://explorer.hiro.so/txid/${response.txid}?chain=mainnet`, "_blank")
            }
          });
      }

    } catch (e) {
      console.error("Mint failed:", e);
      toast.error("Minting failed", {
        description: "Please check your wallet connection and try again."
      });
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Connect Wallet to Mint</CardTitle>
          <CardDescription>
            You need a Stacks wallet to mint your BitSign NFT.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={connect} className="w-full">
            Connect Wallet
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-white/90 backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-heading text-primary">Mint Your BitSign</CardTitle>
        <CardDescription className="text-lg font-body">
          Enter your birth date or birth block height to generate your unique avatar.
          <br />
          <span className="font-bold text-accent">Cost: 5 STX</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="birth-date">Birth Date</Label>
          <Input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={handleDateChange}
          />
          <p className="text-xs text-muted-foreground">
            We use your birth date to estimate your "Bitcoin Birthday" block height.
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-bold tracking-widest">Or enter block height</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="block-height">Block Height</Label>
          <Input
            id="block-height"
            type="number"
            placeholder="e.g. 700000"
            value={blockHeight}
            onChange={(e) => setBlockHeight(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleMint} 
          className="w-full h-12 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" 
          disabled={!blockHeight || isCalculating}
        >
          {isCalculating ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Pickaxe className="mr-2 h-5 w-5" />
          )}
          Mint for 5 STX
        </Button>
      </CardFooter>
    </Card>
  );
}
