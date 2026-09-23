import { Check, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CORE_PLANS, PRICING_NOTE } from "@/lib/content/pricing";
import { CONTACT_EMAIL } from "@/lib/content/site";

export function PricingTable({ full = false }: { full?: boolean }) {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Three plans. Your whole organization, one subscription."
        description="Manual and Photo are self-serve — enter your own data, or let AI read it for you. Pro is fully hands-off: we do the data work for your entire league."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {CORE_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-xl border p-7 ${
              plan.highlighted
                ? "border-accent-amber/50 bg-accent-amber/5"
                : plan.readOnly
                  ? "border-accent-cyan/40 bg-accent-cyan/5"
                  : "border-border bg-background-raised"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              {plan.readOnly ? (
                <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
                  Read-only
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-foreground-muted">{plan.tagline}</p>
            <div className="mt-5 flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-semibold text-foreground">
                €{plan.priceYearly.toLocaleString()}
              </span>
              <span className="text-sm text-foreground-muted">/year</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-foreground-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Getting started with HoopStruct — ${plan.name}`)}`}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-7 w-full"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-foreground-muted">{PRICING_NOTE}</p>

      {full ? (
        <div className="mt-8 flex gap-4 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-6 sm:p-7">
          <Sparkles className="h-7 w-7 shrink-0 text-accent-cyan" strokeWidth={1.5} />
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Built for leagues and federations
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
              Pro is the tier for organizations that don&apos;t want to enter
              a single stat themselves. HoopStruct uploads and analyzes your
              league&apos;s games directly, and every club or team under your
              federation gets full Dashboard, Four Factors, and scouting-report
              access to professionally maintained data — kept current, game
              by game, with nothing for your staff to do but read it.
            </p>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
