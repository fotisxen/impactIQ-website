import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about HoopStruct: photo upload vs play-by-play import, advanced stats, pricing, data handling, and mobile availability.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | HoopStruct",
    description: "Answers to common questions about HoopStruct.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          FAQ
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Frequently asked questions
        </h1>
      </Section>

      <Section>
        <FaqAccordion items={FAQ_ITEMS} />
      </Section>

      <CtaBanner />
    </>
  );
}
