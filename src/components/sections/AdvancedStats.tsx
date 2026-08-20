import { Zap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MetricBadge } from "@/components/ui/Badge";
import {
  CORE_METRICS,
  METRIC_CATEGORIES,
  FOUR_FACTORS_WEIGHTS,
  IMPACT_RATING_CONFIDENCE_LEVELS,
} from "@/lib/content/metrics";

export function AdvancedStats({ full = false }: { full?: boolean }) {
  const metrics = full ? CORE_METRICS : CORE_METRICS.slice(0, 6);

  return (
    <Section id="advanced-stats">
      <SectionHeading
        eyebrow="Advanced stats, unmatched"
        title="The analytics stack nobody else in this space provides."
        description="PIR, PER, PIE, a from-scratch Impact Score, the Four Factors, and a real RAPM-style Impact Rating — the same formulas real analytics teams use, computed individually and at team level, every game, benchmarked against the league."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.code}
            className="rounded-lg border border-border bg-background-raised p-5"
          >
            <p className="font-mono text-sm font-semibold text-accent-cyan">{metric.code}</p>
            <p className="mt-1.5 text-sm font-medium text-foreground">{metric.name}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {full ? (
        <div className="mt-6 rounded-xl border border-border bg-background-raised p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Plus the full taxonomy — not a token few stats
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {METRIC_CATEGORIES.map((category) => (
              <div key={category.name}>
                <p className="text-xs font-semibold text-foreground">{category.name}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {category.metrics.map((code) => (
                    <MetricBadge key={code} code={code} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {full ? (
        <div className="mt-6 rounded-xl border border-border bg-background-raised p-6 sm:p-7">
          <p className="text-sm font-semibold text-foreground">
            Four Factors, weighted the way they actually predict winning
          </p>
          <p className="mt-1.5 text-sm text-foreground-muted">
            Each combo score blends the core factor with real sub-metrics — Assisted FG%, live-ball
            turnover rate, opponent OREB%, and more.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {FOUR_FACTORS_WEIGHTS.map((factor) => (
              <div key={factor.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-foreground-muted">{factor.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-accent-amber"
                    style={{ width: `${factor.weight}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 text-right font-mono text-xs text-foreground">
                  {factor.weight}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex gap-4 rounded-xl border border-accent-amber/30 bg-accent-amber/5 p-6 sm:p-7">
        <Zap className="h-7 w-7 shrink-0 text-accent-amber" strokeWidth={1.5} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            One real Impact Rating. Not two borrowed ones.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            Built from actual play-by-play lineup data — the same core
            technique behind LEBRON and EPM — reconstructed straight from
            your play-by-play import. It ships with a visible confidence
            level ({IMPACT_RATING_CONFIDENCE_LEVELS.join(" → ")}) based on
            how many games actually back the number, instead of two
            arbitrarily-different commercial numbers dressed up as certainty.
          </p>
        </div>
      </div>
    </Section>
  );
}
