import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatPanel } from "@/components/illustrations/StatPanel";

export function Hero() {
  return (
    <section className="border-b border-border bg-grid">
      <Container className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
            Basketball analytics nobody else provides
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We analyze basketball like no one else does.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            AI reads the box score. Real statistics do the rest — a true
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

        <div className="flex justify-center lg:justify-end">
          <StatPanel />
        </div>
      </Container>
    </section>
  );
}
