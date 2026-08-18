import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  CORE_PLANS,
  UPLOAD_ADDONS,
  CLUB_TIER,
  PRICING_NOTE,
} from "@/lib/content/pricing";
import { CONTACT_EMAIL } from "@/lib/content/site";

export function PricingTable({ full = false }: { full?: boolean }) {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple base plans. Metered only where it costs us real money."
        description="Play-by-play import is free and unlimited on every plan. Photo upload is metered separately, because every scan costs real API money."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {CORE_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-xl border p-7 ${
              plan.highlighted
                ? "border-accent-amber/50 bg-accent-amber/5"
                : "border-border bg-background-raised"
            }`}
          >
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <p className="mt-1 text-sm text-foreground-muted">{plan.tagline}</p>
            <div className="mt-5 flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-semibold text-foreground">
                €{plan.priceMonthly}
              </span>
              <span className="text-sm text-foreground-muted">{plan.priceSuffix}</span>
            </div>
            {plan.perSeat ? (
              <p className="mt-1 text-xs text-foreground-muted">
                +€{plan.perSeat.amount}/seat from seat {plan.perSeat.fromSeat}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-foreground-muted">
              or €{plan.priceYearly}/year (save 10%)
            </p>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-foreground-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              href={`mailto:${CONTACT_EMAIL}?subject=Getting%20started%20with%20Impact%20IQ`}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-7 w-full"
            >
              {plan.cta}
            </Button>
          </div>
        ))}

        <div className="flex flex-col rounded-xl border border-border border-dashed bg-background-raised p-7">
          <h3 className="text-lg font-semibold text-foreground">{CLUB_TIER.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
            {CLUB_TIER.tagline}
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=League%2Fclub%20integration`}
            variant="secondary"
            className="mt-6 w-full"
          >
            {CLUB_TIER.cta}
          </Button>
        </div>
      </div>

      {full ? (
        <div className="mt-12">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Upload add-on — photo quota, billed separately
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {UPLOAD_ADDONS.map((addon) => (
              <div key={addon.id} className="rounded-lg border border-border bg-background-raised p-5">
                <p className="text-sm font-semibold text-foreground">{addon.name}</p>
                <p className="mt-1 font-mono text-xl font-semibold text-foreground">
                  €{addon.priceMonthly}
                  <span className="text-xs font-normal text-foreground-muted">/month</span>
                </p>
                <p className="mt-2 text-xs text-foreground-muted">{addon.quota}</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-foreground-muted">
            {PRICING_NOTE}
          </p>
        </div>
      ) : null}
    </Section>
  );
}
