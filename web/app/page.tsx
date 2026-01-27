import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Droplets, Sun, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Solar Decoration */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl -z-10" />

        {/* Hero */}
        <section className="py-24 md:py-32 text-center">
          <div className="container px-4 mx-auto">
            <h1 className="mb-6 text-6xl md:text-8xl font-heading font-bold text-[#2aa198] leading-[1.1] md:leading-[1.1]">
              Regen<br />
              <span className="text-accent inline-block mt-2">Your Roots</span>
            </h1>
            <p className="mx-auto max-w-xl text-2xl text-muted-foreground font-body">
              Technology that breathes. Mint your unique BitSign avatar based on the Bitcoin block of your birth.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/mint">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Plant Your Seed <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What is BitSigns? */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="container px-4 mx-auto text-center max-w-4xl">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">The Concept</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
              Bitcoin Astrology
            </h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed mb-8">
              Just as the stars align at your birth, the <strong>Bitcoin Blockchain</strong> captures a unique state of the network the moment you were born. 
              <br/><br/>
              BitSigns calculates your <strong>Birth Block</strong> to determine your Elemental Sign, Energy, and Archetype. 
              We then use generative AI to visualize this data into a unique, immutable avatar.
            </p>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">The Journey</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#2aa198]">
                How It Works
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-4 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-[#2aa198]/20 via-primary/20 to-accent/20 -z-10" />

              {[
                { step: "01", title: "Connect", desc: "Link your Stacks wallet to begin." },
                { step: "02", title: "Discover", desc: "Enter your birth date to find your Block." },
                { step: "03", title: "Mint", desc: "Generate your unique AI Avatar on-chain." },
                { step: "04", title: "Reveal", desc: "Unlock daily fortunes and compatibility." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-[#fdf6e3] shadow-lg flex items-center justify-center mb-6 z-10 transition-transform group-hover:scale-110 group-hover:border-primary/20">
                    <span className="text-2xl font-heading font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-body max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <Link href="/mint" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-[#2aa198]/10 flex items-center justify-center text-[#2aa198]">
                      <Sprout className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-[#2aa198]">Grow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Mint your seedling based on block height. A 1-of-1 generative avatar.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 2 */}
              <Link href="/fortune" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Droplets className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-accent">Nurture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Receive daily water (oracle readings) for your soul based on chain activity.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 3 */}
              <Link href="/compatibility" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Sun className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-primary">Bloom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Connect your roots with others. Check compatibility between wallets.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="py-24 text-center">
          <div className="container px-4 mx-auto max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
              Ready to find your Sign?
            </h2>
            <p className="text-xl text-muted-foreground font-body mb-10">
              The blockchain is eternal. Your sign is waiting to be discovered.
            </p>
            <Link href="/mint">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform bg-accent hover:bg-accent/90 text-white">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
