import { FileText, Smartphone, CheckCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const STEPS = [
  {
    icon: FileText,
    title: "Coach publishes",
    body: "A finished scouting report PDF, sent straight from the desktop app to the whole roster.",
  },
  {
    icon: Smartphone,
    title: "Player opens the app",
    body: "Each player opens the companion mobile app and always sees exactly the current report — never a stale one, never next week's early.",
  },
  {
    icon: CheckCheck,
    title: "Coach sees who's read it",
    body: "A simple view back in the desktop app shows who's actually opened the report, and who hasn't yet.",
  },
];

export function ReportDistribution() {
  return (
    <Section id="report-distribution" grid>
      <SectionHeading
        eyebrow="Built for players too"
        title="From your desk to every player's pocket."
        description="The first part of HoopStruct built for a player to use directly — not just a coach or analyst."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title} className="rounded-xl border border-border bg-background-raised p-7">
            <span className="font-mono text-xs text-accent-cyan">0{i + 1}</span>
            <step.icon className="mt-3 h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
