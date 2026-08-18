import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PricingTable } from "@/components/sections/PricingTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Impact IQ pricing: Individual and Team base plans, plus a separately-billed photo-upload add-on since every scan costs real API money. Play-by-play import is free and unlimited.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | Impact IQ",
    description:
      "Individual and Team base plans, plus a metered photo-upload add-on. Play-by-play import is free and unlimited on every plan.",
  },
};

const BILLING_FAQS = FAQ_ITEMS.filter((item) =>
  ["billed", "leagues, federations"].some((needle) => item.answer.includes(needle) || item.question.includes(needle))
);

export default function PricingPage() {
  return (
    <>
      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Pricing
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Pay for what actually costs us money.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Play-by-play import is parsed locally and free on every plan. Photo
          upload uses AI, so it&apos;s billed separately, in tiers that scale with
          how much you actually scan.
        </p>
      </Section>

      <PricingTable full />

      <Section>
        <SectionHeading eyebrow="Billing FAQ" title="Pricing questions" />
        <div className="mt-8">
          <FaqAccordion items={BILLING_FAQS} />
        </div>
        <div className="mt-6">
          <Button href="/faq" variant="secondary">
            See all FAQs
          </Button>
        </div>
      </Section>
    </>
  );
}
