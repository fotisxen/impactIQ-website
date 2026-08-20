import { Section, SectionHeading } from "@/components/ui/Section";
import {
  RadarChartIcon,
  ShotChartIcon,
  WinProbabilityIcon,
  RidgeplotIcon,
  BumpChartIcon,
  GravityMapIcon,
} from "@/components/illustrations/ChartIcons";

const CHARTS = [
  {
    Icon: RadarChartIcon,
    name: "Opta-style radar",
    use: "A player's percentile profile against the league, across every key stat category.",
  },
  {
    Icon: ShotChartIcon,
    name: "Shot chart",
    use: "Every make and miss, plotted exactly where it happened on the floor.",
  },
  {
    Icon: WinProbabilityIcon,
    name: "Win probability",
    use: "How the game swung, possession by possession, from tip to final buzzer.",
  },
  {
    Icon: RidgeplotIcon,
    name: "Ridgeline",
    use: "A stat's full distribution across a season, layered so the shape is unmistakable.",
  },
  {
    Icon: BumpChartIcon,
    name: "Bump chart",
    use: "How rankings — scoring, efficiency, standings — shift and cross over time.",
  },
  {
    Icon: GravityMapIcon,
    name: "Gravity & movement",
    use: "Where the offense pulls defensive attention, and how the ball actually moves.",
  },
];

export function ChartsShowcase({ full = false }: { full?: boolean }) {
  const charts = full ? CHARTS : CHARTS.slice(0, 3);

  return (
    <Section id="charts">
      <SectionHeading
        eyebrow="Visualization nobody else offers"
        title="Six chart types built for basketball, not spreadsheets."
        description="Each one opens from clicking the relevant stat, with a plain-English line explaining what it shows."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {charts.map(({ Icon, name, use }) => (
          <div key={name} className="rounded-xl border border-border bg-background-raised p-6">
            <div className="h-24 w-24 text-foreground-muted">
              <Icon />
            </div>
            <h3 className="mt-3 text-base font-semibold text-foreground">{name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{use}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
