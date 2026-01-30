import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">
              Community Gallery
            </h1>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Witness the latest BitSigns minted by the community. Each one a unique reflection of Bitcoin history.
            </p>
          </div>

          {/* Placeholder for Grid */}
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Loading recent mints...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
