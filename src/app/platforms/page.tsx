import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Platforms } from "@/components/sections/Platforms";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Impact IQ is available today as a Windows desktop app. iOS and Android are on the way — scan the QR code for early access.",
  alternates: { canonical: "/platforms" },
  openGraph: {
    title: "Platforms | Impact IQ",
    description: "Available today on Windows desktop. iOS and Android are on the way.",
  },
};

export default function PlatformsPage() {
  return (
    <>
      <Section border={false} grid className="pb-0 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Platforms
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          One platform live. Two more almost here.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Desktop carries the full analytics engine today. Mobile is next —
          scan below for early access.
        </p>
      </Section>

      <Platforms full />

      <CtaBanner
        title="Ready on desktop right now."
        description="Get the full analytics engine today on Windows — mobile will carry the same standard when it ships."
      />
    </>
  );
}
