"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  tokenId: number;
  sign: string;
  element: string;
}

export function ShareButton({ tokenId, sign, element }: ShareButtonProps) {
  const handleShare = () => {
    const text = `I just minted my BitSign #${tokenId}! I am "The ${sign}" (${element}). Discover your Bitcoin destiny.`;
    const url = `https://bitsigns.xyz/gallery?id=${tokenId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <Button onClick={handleShare} variant="outline" className="gap-2 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white">
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  );
}
