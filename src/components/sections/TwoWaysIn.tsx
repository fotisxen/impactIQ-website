import { Camera, FileSpreadsheet, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const PHOTO_POINTS = [
  "Upload a photo of a printed or screenshotted box score",
  "Claude AI reads it via OCR and extracts a full stat line for both teams",
  "Fast — works from almost any box score you can point a camera at",
];

const PBP_POINTS = [
  "Import a EuroLeague-style play-by-play Excel export",
  "Parsed locally — zero API cost, unlimited on any plan",
  "Exact free-throw splits, exact shot types, fouls drawn, shots rejected",
  "Real, measured minutes and plus/minus, reconstructed from substitution timestamps and score deltas",
];

export function TwoWaysIn({ full = false }: { full?: boolean }) {
  return (
    <Section id="two-ways-in">
      <SectionHeading
        eyebrow="How data gets in"
        title="Two ways in. One unmatched output."
        description="Both paths produce a real box score. One of them also unlocks the analytics no photo or manual entry can give you."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background-raised p-7">
          <Camera className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
          <h3 className="mt-4 text-xl font-semibold text-foreground">Photo upload</h3>
          <p className="mt-1 text-sm text-foreground-muted">
            The easy, metered path — powered by AI for the part AI is actually good at.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {PHOTO_POINTS.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-foreground-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-amber" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-accent-cyan/30 bg-background-raised p-7">
          <div className="flex items-start justify-between">
            <FileSpreadsheet className="h-7 w-7 text-accent-cyan" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
              Unlocks real +/-
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Play-by-play import</h3>
          <p className="mt-1 text-sm text-foreground-muted">
            The differentiator — free, local, and more accurate than either photo or manual entry.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {PBP_POINTS.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-foreground-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
          {full ? (
            <p className="mt-5 border-t border-border pt-4 text-sm text-foreground-muted">
              As far as we&apos;ve found, no other consumer-facing tool in this
              space reconstructs real minutes and plus/minus from a spreadsheet
              import — everyone else estimates or leaves it out.
            </p>
          ) : null}
        </div>
      </div>

      {full ? (
        <p className="mt-6 text-sm text-foreground-muted">
          Manual entry is always there too, as a baseline. The principle
          holds across all three: the more data you give Impact IQ, the
          deeper it can go — a manually-typed line gets the standard box
          score and headline metrics, and play-by-play is what unlocks real
          plus/minus and the Impact Rating.
        </p>
      ) : null}
    </Section>
  );
}
