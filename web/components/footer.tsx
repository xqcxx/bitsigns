import { Badge } from "@/components/ui/badge";
import { APP_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full py-12 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex justify-center gap-6">
          <a
            href="https://github.com/talent-protocol"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Twitter
          </a>
        </div>
        <p className="text-sm opacity-60 mb-4">
          &copy; {new Date().getFullYear()} BitSigns. Solar-powered destiny on Stacks.
        </p>
        <Badge variant="outline" className="text-xs border-muted-foreground/30 text-muted-foreground">
          {APP_CONFIG.NETWORK === 'mainnet' ? '● Mainnet' : '○ Testnet'}
        </Badge>
      </div>
    </footer>
  );
}
