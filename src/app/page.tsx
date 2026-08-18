import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Differentiators } from "@/components/sections/Differentiators";
import { TwoWaysIn } from "@/components/sections/TwoWaysIn";
import { AdvancedStats } from "@/components/sections/AdvancedStats";
import { Insights } from "@/components/sections/Insights";
import { ChartsShowcase } from "@/components/sections/ChartsShowcase";
import { ArenaWalkthrough } from "@/components/interactive/ArenaWalkthrough";
import { Platforms } from "@/components/sections/Platforms";
import { PricingTable } from "@/components/sections/PricingTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Differentiators />
      <TwoWaysIn />
      <AdvancedStats />
      <Insights />
      <ChartsShowcase />
      <ArenaWalkthrough />
      <Platforms />
      <PricingTable />

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="A few of the ones people ask first."
        />
        <div className="mt-10">
          <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
        </div>
        <div className="mt-6">
          <Button href="/faq" variant="secondary">
            See all FAQs
          </Button>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
