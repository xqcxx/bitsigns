"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  imageUri: string;
  fileName: string;
}

export function DownloadButton({ imageUri, fileName }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      // Use the gateway URL
      const url = imageUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      variant="ghost" 
      size="icon" 
      className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white rounded-full"
      title="Download Avatar"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}
