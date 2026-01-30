import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fdf6e3] text-center">
      <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
      <h2 className="mt-4 text-3xl font-heading font-bold text-foreground">Block Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for has been orphaned from the chain.
      </p>
      <Link href="/" className="mt-8">
        <Button size="lg" className="rounded-full">Return Home</Button>
      </Link>
    </div>
  );
}
