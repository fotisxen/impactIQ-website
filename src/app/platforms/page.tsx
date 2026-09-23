import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Platforms } from "@/components/sections/Platforms";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "HoopStruct is available today as a Windows and macOS desktop app. A real player companion app is in TestFlight and Play Store internal testing.",
  alternates: { canonical: "/platforms" },
  openGraph: {
    title: "Platforms | HoopStruct",
    description:
      "Available today on Windows and macOS desktop. A real player companion app is in testing.",
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
          The analytics engine on desktop. Reports in every player&apos;s pocket.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Desktop runs the full analytics engine today. The companion mobile
          app is a different, narrower thing — built for players, not coaches
          — and it&apos;s already real, in testing now.
        </p>
      </Section>

      <Platforms full />

      <CtaBanner
        title="Ready on desktop right now."
        description="Get the full analytics engine today on Windows or macOS, and publish your first scouting report straight to your roster's phones."
      />
    </>
  );
}
