"use client";

import * as React from "react";
import { WalletProvider } from "./wallet-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </WalletProvider>
  );
}
