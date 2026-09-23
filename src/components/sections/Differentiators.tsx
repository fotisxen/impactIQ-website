import { Sparkles, Activity, Gauge, ClipboardList } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const ITEMS = [
  {
    icon: Sparkles,
    name: "AI-powered capture",
    description:
      "Snap a photo of a box score and AI extracts the full stat line in seconds — nobody else in this space does that from a phone photo.",
  },
  {
    icon: Activity,
    name: "Real plus/minus",
    description:
      "Reconstructed from actual substitution timestamps, not estimated. Most consumer tools don't have this at all.",
  },
  {
    icon: Gauge,
    name: "RAPM-style Impact Rating",
    description:
      "Built from scratch with the same technique behind modern industry metrics like LEBRON and EPM — with a visible confidence level, not a black-box number.",
  },
  {
    icon: ClipboardList,
    name: "Instant scouting reports",
    description:
      "Full scouting breakdowns for any game, team, or player — generated the moment a game ends, no analyst required.",
  },
];

export function Differentiators() {
  return (
    <Section id="differentiators" grid>
      <SectionHeading
        eyebrow="The difference"
        title="Analysis nobody else in basketball provides."
        description="Every other tool in this space stops at basic stats or fakes the advanced ones. HoopStruct was built to actually go deep."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.name} className="rounded-xl border border-border bg-background-raised p-6">
            <item.icon className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <h3 className="mt-4 text-base font-semibold text-foreground">{item.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
