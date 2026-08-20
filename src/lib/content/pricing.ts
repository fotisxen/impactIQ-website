export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  priceSuffix: string;
  perSeat?: {
    amount: number;
    fromSeat: number;
  };
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const CORE_PLANS: PricingPlan[] = [
  {
    id: "individual",
    name: "Individual",
    tagline: "For a coach, player, or parent tracking one team.",
    priceMonthly: 8,
    priceYearly: 86.4,
    priceSuffix: "/month",
    features: [
      "Full basic + advanced stat box scores",
      "PIR, PER, PIE, Impact Score, DOE, Net Rating",
      "Photo upload and play-by-play import",
      "6 purpose-built chart types",
      "Leaderboards, Excel/PDF exports, and point-in-season advanced reports",
      "Shareable branded report cards",
    ],
    cta: "Get started",
  },
  {
    id: "team",
    name: "Team",
    tagline: "For a club or staff tracking a full roster together.",
    priceMonthly: 15,
    priceYearly: 162,
    priceSuffix: "/month",
    perSeat: { amount: 6, fromSeat: 3 },
    features: [
      "Everything in Individual",
      "Invite-based team accounts",
      "Shared season data across staff",
      "Soft-delete on join — nothing hard-deleted",
      "Multi-competition tracking (league + cup + continental)",
      "Team-wide scouting reports",
    ],
    cta: "Get started",
    highlighted: true,
  },
];

export type UploadAddonPlan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  quota: string;
};

export const UPLOAD_ADDONS: UploadAddonPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Light photo-upload usage alongside free play-by-play imports.",
    priceMonthly: 5,
    quota: "~25 photo uploads / month",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For staff who scan most box scores from photos.",
    priceMonthly: 12,
    quota: "~75 photo uploads / month",
  },
  {
    id: "studio",
    name: "Studio",
    description: "High-volume photo processing for larger organizations.",
    priceMonthly: 25,
    quota: "~200 photo uploads / month",
  },
];

export const CLUB_TIER = {
  name: "Club & League",
  tagline:
    "Want your league or federation's competition data professionally integrated? Let's talk.",
  cta: "Contact us",
};

export const PRICING_NOTE =
  "Play-by-play import is parsed locally and never counts against your upload quota — the upload add-on only covers photo scans, since those are the ones that cost real API money.";
