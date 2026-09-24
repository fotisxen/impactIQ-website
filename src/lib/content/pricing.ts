export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  priceYearly: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
  readOnly?: boolean;
};

// Whole-organization pricing, annual only, every coach at the same club
// or org shares one subscription and one pooled view of whatever any of
// them uploads. Not per-user, not metered.
export const CORE_PLANS: PricingPlan[] = [
  {
    id: "manual",
    name: "Manual",
    tagline: "For a club entering box scores by hand, no AI upload on this tier.",
    priceYearly: 200,
    features: [
      "Manual box-score entry",
      "Full basic + advanced stat box scores",
      "PIR, PER, PIE, Impact Score, DOE, Net Rating",
      "Shot Chart Entry: manual shot-location logging",
      "6 purpose-built chart types",
      "Scouting reports, published straight to your roster",
    ],
    cta: "Get started",
  },
  {
    id: "photo",
    name: "Photo",
    tagline: "Everything in Manual, plus AI photo-upload box scores, unlimited.",
    priceYearly: 500,
    features: [
      "Everything in Manual",
      "AI photo-upload box-score extraction, unlimited",
      "Play-by-play import: real +/- and Impact Rating",
      "Multi-competition tracking (league + cup + continental)",
      "Shot Chart Entry: manual shot-location logging",
      "Team-wide scouting reports",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Fully read-only: we do the data work for your whole league.",
    priceYearly: 4000,
    readOnly: true,
    features: [
      "No data entry, ever: nothing to upload yourself",
      "HoopStruct uploads and analyzes every game in your league",
      "Full Dashboard, Four Factors, and scouting-report access",
      "Kept fully up to date, game by game",
      "Built for leagues, federations, and large clubs",
      "Your whole staff included in one subscription",
    ],
    cta: "Talk to us",
  },
];

export const PRICING_NOTE =
  "All three tiers are annual and organization-wide: one subscription per club or league, shared by every coach on staff, not billed per seat.";
