export const SITE_NAME = "Impact IQ";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://impactiq.example.com"
).replace(/\/$/, "");

// Placeholder — swap for a real inbox before launch.
export const CONTACT_EMAIL = "info@opensite.gr";

// Placeholder — this is a mailto, not a live calendar booking widget. Swap
// for a real scheduling link (Calendly, Cal.com, etc.) once one exists.
export const SCHEDULE_CALL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Schedule a call with Impact IQ"
)}`;

export const SITE_TAGLINE =
  "Basketball analytics nobody else provides.";

export const SITE_DESCRIPTION =
  "Impact IQ turns box scores and play-by-play exports into analysis nobody else in basketball offers — AI-powered capture, real plus/minus, PIR, PER, PIE, and a from-scratch RAPM impact rating.";

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/platforms", label: "Platforms" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/product#two-ways-in", label: "Two ways to import" },
      { href: "/product#advanced-stats", label: "Advanced stats" },
      { href: "/product#insights", label: "Scouting insights" },
      { href: "/product#charts", label: "Charts" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/platforms", label: "Platforms" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
