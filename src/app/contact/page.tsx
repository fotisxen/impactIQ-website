import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HoopStruct: email us or request a call for pricing, club/league integration, or general questions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | HoopStruct",
    description: "Get in touch: email us or request a call.",
  },
};

const RELEVANT_FAQS = FAQ_ITEMS.filter((item) =>
  ["leagues, federations", "billed"].some(
    (needle) => item.answer.includes(needle) || item.question.includes(needle)
  )
);

export default function ContactPage() {
  return (
    <>
      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Contact
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Talk to a real person, not a form that goes nowhere.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Whether it&apos;s a quick pricing question or a league-wide
          integration, here&apos;s how to reach us.
        </p>
      </Section>

      <ContactSection />

      <Section>
        <FaqAccordion items={RELEVANT_FAQS} />
        <div className="mt-6">
          <Button href="/faq" variant="secondary">
            See all FAQs
          </Button>
        </div>
      </Section>
    </>
  );
}
