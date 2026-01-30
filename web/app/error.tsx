"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fdf6e3] text-center">
      <h2 className="text-3xl font-heading font-bold text-destructive mb-4">System Malfunction</h2>
      <p className="max-w-md text-muted-foreground mb-8">
        We encountered an error processing your request. The mempool might be congested.
      </p>
      <Button onClick={reset} variant="default" size="lg" className="rounded-full">
        Try Again
      </Button>
    </div>
  );
}
