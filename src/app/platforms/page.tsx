import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Platforms } from "@/components/sections/Platforms";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "HoopStruct for Windows, macOS, iOS and Android. Install it from the Microsoft Store, Mac App Store, App Store or Google Play.",
  alternates: { canonical: "/platforms" },
  openGraph: {
    title: "Platforms | HoopStruct",
    description:
      "Install HoopStruct from the Microsoft Store, Mac App Store, App Store or Google Play.",
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
          Desktop runs the full analytics engine. The companion mobile app is a
          different, narrower thing, built for players, not coaches.
        </p>
      </Section>

      <Platforms full />

      <CtaBanner
        title="Install HoopStruct from your store."
        description="Get the full analytics engine on Windows or macOS, and publish your first scouting report straight to your roster's phones."
      />
    </>
  );
}
