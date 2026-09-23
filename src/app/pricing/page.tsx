import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PricingTable } from "@/components/sections/PricingTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "HoopStruct pricing: Manual (€200/year) and Photo (€500/year) self-serve plans, plus a fully read-only Pro tier (€4,000/year) for leagues and federations. Annual, organization-wide, no per-seat billing.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | HoopStruct",
    description:
      "Manual, Photo, and a fully read-only Pro tier for leagues and federations — annual, organization-wide.",
  },
};

const BILLING_FAQS = FAQ_ITEMS.filter((item) =>
  ["Manual, Photo, and Pro", "leagues, federations"].some(
    (needle) => item.answer.includes(needle) || item.question.includes(needle)
  )
);

export default function PricingPage() {
  return (
    <>
      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Pricing
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          One subscription for your whole club.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Three annual, organization-wide plans — enter your own data on
          Manual or Photo, or go fully hands-off on Pro and let us do the
          data work for your league.
        </p>
      </Section>

      <PricingTable full />

      <Section>
        <SectionHeading eyebrow="Pricing FAQ" title="Pricing questions" />
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
