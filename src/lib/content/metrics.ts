export type Metric = {
  code: string;
  name: string;
  description: string;
};

export const CORE_METRICS: Metric[] = [
  {
    code: "PIR",
    name: "Performance Index Rating",
    description: "EuroLeague-style production score from a single box score line.",
  },
  {
    code: "PER",
    name: "Player Efficiency Rating",
    description: "Hollinger-style, pace-adjusted per-minute production.",
  },
  {
    code: "PIE",
    name: "Player Impact Estimate",
    description: "NBA's real formula — a player's share of everything that happened on court.",
  },
  {
    code: "IS",
    name: "Impact Score",
    description: "A from-scratch composite built specifically for Impact IQ's data.",
  },
  {
    code: "DOE",
    name: "Four Factors + Ratings",
    description: "Dean Oliver's Four Factors plus offensive and defensive rating.",
  },
  {
    code: "NET",
    name: "Net Rating",
    description: "ORtg minus DRtg — for players, built from real +/- when play-by-play exists.",
  },
  {
    code: "USG%",
    name: "Usage Rate",
    description: "Share of a team's possessions a player used while on court.",
  },
  {
    code: "RAPM",
    name: "Impact Rating",
    description: "A real, from-scratch adjusted plus-minus — box score plus lineup data, the same technique behind LEBRON and EPM.",
  },
];

