import { Zap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CORE_METRICS } from "@/lib/content/metrics";

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

      <div className="mt-10 flex gap-4 rounded-xl border border-accent-amber/30 bg-accent-amber/5 p-6 sm:p-7">
        <Zap className="h-7 w-7 shrink-0 text-accent-amber" strokeWidth={1.5} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Real plus/minus. Real RAPM. Nobody else does this from a spreadsheet import.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            The Impact Rating is built the same way modern industry metrics
            like LEBRON and EPM are — box score plus lineup data, reconstructed
            straight from your play-by-play import.
          </p>
        </div>
      </div>
    </Section>
  );
}
