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
    description: "NBA's real formula: a player's share of everything that happened on court.",
  },
  {
    code: "IS",
    name: "Impact Score",
    description: "A from-scratch, BPM-style composite built specifically for HoopStruct's data.",
  },
  {
    code: "DOE",
    name: "Four Factors + Ratings",
    description: "Dean Oliver's Four Factors, weighted, plus offensive and defensive rating.",
  },
  {
    code: "NET",
    name: "Net Rating",
    description: "Exact ORtg minus DRtg, for players, built from real +/- when play-by-play exists.",
  },
  {
    code: "USG%",
    name: "Usage Rate",
    description: "Share of a team's possessions a player used while on court.",
  },
  {
    code: "RAPM",
    name: "Impact Rating",
    description: "A real, from-scratch adjusted plus-minus: box score plus lineup data, the same technique behind LEBRON and EPM.",
  },
];

export type MetricCategory = {
  name: string;
  metrics: string[];
};

// The full taxonomy beyond the headline eight, every one derived and
// documented, not a token handful. Shown as a supporting strip, not
// individually explained, since there are simply too many to caption.
export const METRIC_CATEGORIES: MetricCategory[] = [
  {
    name: "Scoring",
    metrics: ["PPFT", "PP2PS", "PP3PS", "PTS/Shot", "PTS/Poss", "PTS/100 Poss"],
  },
  {
    name: "Shooting",
    metrics: ["TS%", "eFG%", "FT Rate", "3PA Rate"],
  },
  {
    name: "Rebounding",
    metrics: ["OREB%", "DREB%", "TRB%"],
  },
  {
    name: "Ball handling",
    metrics: ["AST%", "STL%", "BLK%", "TOV%", "AST/TOV", "STL/TOV"],
  },
];

export const FOUR_FACTORS_WEIGHTS = [
  { name: "Shooting", weight: 40 },
  { name: "Ball handling", weight: 25 },
  { name: "Rebounding", weight: 20 },
  { name: "FT rate", weight: 15 },
];

export const IMPACT_RATING_CONFIDENCE_LEVELS = ["Very Low", "Low", "Medium", "High"];
