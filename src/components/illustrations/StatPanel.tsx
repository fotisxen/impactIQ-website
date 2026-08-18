import { RadarChartIcon } from "./ChartIcons";

const ROWS = [
  { label: "PTS", value: 84, of: 100 },
  { label: "REB", value: 41, of: 60 },
  { label: "AST", value: 22, of: 35 },
  { label: "PIE", value: 58, of: 100 },
];

export function StatPanel() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background-raised p-5 shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            Game report
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">Home 78 — 71 Away</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-1 font-mono text-[10px] font-semibold text-accent-cyan">
          PLAY-BY-PLAY
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-9 font-mono text-xs text-foreground-muted">{row.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent-amber"
                style={{ width: `${(row.value / row.of) * 100}%` }}
              />
            </div>
            <span className="w-7 text-right font-mono text-xs font-tabular text-foreground">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            Impact Rating
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">+9.4</p>
          <p className="mt-0.5 text-[11px] text-foreground-muted">Top tier — league-wide</p>
        </div>
        <div className="h-16 w-16 text-accent-amber">
          <RadarChartIcon />
        </div>
      </div>
    </div>
  );
}
