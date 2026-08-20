import type { Metadata } from "next";
import { Layers, ListChecks } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TwoWaysIn } from "@/components/sections/TwoWaysIn";
import { AdvancedStats } from "@/components/sections/AdvancedStats";
import { Insights } from "@/components/sections/Insights";
import { ChartsShowcase } from "@/components/sections/ChartsShowcase";
import { DataFlowWalkthrough } from "@/components/interactive/DataFlowWalkthrough";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Impact IQ turns a photo or a play-by-play export into real basketball analytics — advanced stats, scouting insights, and purpose-built charts nobody else in this space provides.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Product | Impact IQ",
    description:
      "How Impact IQ turns a photo or a play-by-play export into real basketball analytics.",
  },
};

export default function ProductPage() {
  return (
    <>
      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Product
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Everything Impact IQ computes — and why nobody else computes it this deeply.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Two ways to get a box score in, a full stack of real advanced
          stats, scouting-report insights, and charts picked for what they
          actually show — not the same bar chart five times.
        </p>
      </Section>

      <TwoWaysIn full />
      <AdvancedStats full />
      <Insights full />
      <ChartsShowcase full />
      <DataFlowWalkthrough />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-background-raised p-7 sm:flex-row sm:items-start">
            <Layers className="h-7 w-7 shrink-0 text-accent-amber" strokeWidth={1.5} />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Multi-competition support
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                The same team or player can play across multiple leagues and
                cups in one season — domestic league, national cup, and
                continental competition — including the Greek Cup, Copa del
                Rey, Coppa Italia, Turkish Cup, Coupe de France, BBL-Pokal,
                LKL Cup, and Israeli State Cup. Stats are correctly isolated
                per competition, and also viewable combined across all of them.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-xl border border-border bg-background-raised p-7 sm:flex-row sm:items-start">
            <ListChecks className="h-7 w-7 shrink-0 text-accent-cyan" strokeWidth={1.5} />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Primary, context, and strategic — the honest way
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                The Four Factors breakdown for any team is organized in three
                tiers: Primary (what actually happened — ORtg, DRtg, Net
                Rating, eFG%, TOV%, ORB%, FTr), Context (pace, opponent
                quality, lineup combinations from play-by-play data), and
                Strategic (why it happened). The Strategic tier is shown as
                an explicit N/A with the reason — it needs film and tracking
                data no box-score-based tool can produce, and we&apos;d
                rather say so than fake it.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="See it applied to your own team."
        description="Start with whichever import fits what you already have — a photo, or a play-by-play export."
      />
    </>
  );
}
