import { ClipboardList, Users, UserRound, Crosshair } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const MODES = [
  {
    icon: ClipboardList,
    name: "Game insights",
    summary:
      "Pick a saved game and get what went well and what went less well, for both teams, at team and player level.",
    points: [
      "A normally-high scorer going cold",
      "A low-volume player breaking out",
      "A non-rebounder suddenly crashing the offensive glass",
    ],
  },
  {
    icon: Users,
    name: "Team scouting report",
    summary:
      "Strengths and weaknesses versus the league average, plus key players ranked by real PIE.",
    points: null,
  },
  {
    icon: UserRound,
    name: "Player scouting report",
    summary:
      "The same strengths/weaknesses framing, focused on how one player's stat line shifts between wins and losses.",
    points: null,
  },
];

export function Insights({ full = false }: { full?: boolean }) {
  return (
    <Section id="insights" grid>
      <SectionHeading
        eyebrow="Insights nobody else generates"
        title="Scouting reports, written instantly for every game, team, and player."
        description="The kind of breakdown a scout would spend hours building — real comparisons against real season averages, ready the moment a game ends."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {MODES.map((mode) => (
          <div key={mode.name} className="rounded-xl border border-border bg-background-raised p-7">
            <mode.icon className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{mode.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{mode.summary}</p>
            {full && mode.points ? (
              <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {mode.points.map((point) => (
                  <li key={point} className="text-xs text-foreground-muted">
                    · {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {full ? (
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-7 sm:flex-row sm:items-start">
          <Crosshair className="h-7 w-7 shrink-0 text-accent-cyan" strokeWidth={1.5} />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">&ldquo;How to beat them&rdquo;</h3>
              <Badge>Sharpest insight</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
              Team scouting reports compare a team&apos;s own numbers in losses
              versus wins — turns it over more, gets outrebounded, allows more
              points, whatever the real pattern is — so an opposing coach
              knows exactly what to force.
            </p>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
