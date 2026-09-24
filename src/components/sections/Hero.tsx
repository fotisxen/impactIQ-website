import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatPanel } from "@/components/illustrations/StatPanel";
import { HeroStage } from "@/components/sections/HeroStage";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-accent-amber/20 blur-[120px]"
      />

      <Container className="relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <Image
            src="/logo.png"
            alt="HoopStruct logo"
            width={88}
            height={88}
            priority
            className="rounded-[22%] shadow-[0_0_0_1px_var(--border-strong),0_16px_40px_-12px_rgba(254,141,25,0.5)]"
          />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
            Basketball analytics nobody else provides
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We analyze basketball{" "}
            <span className="text-accent-amber">like no one else does.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            AI reads the box score. Real statistics do the rest: a true
            plus/minus, a from-scratch RAPM-style Impact Rating,
            scouting-report insights, and shot-chart-level detail no other
            tool in this space gives you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/pricing" variant="primary">
              View pricing
            </Button>
            <Button href="/product" variant="secondary">
              See what&apos;s inside
            </Button>
          </div>
        </div>

        <HeroStage>
          <StatPanel />
        </HeroStage>
      </Container>
    </section>
  );
}
