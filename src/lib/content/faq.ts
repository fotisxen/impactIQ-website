export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's the difference between the photo upload and the play-by-play import?",
    answer:
      "Both produce a full box score, but they're not equal. Photo upload reads a printed or screenshotted box score with AI OCR — fast, and works from almost anything. Play-by-play import parses a EuroLeague-style Excel export locally, at zero API cost, and is more accurate: exact free-throw splits, exact shot types, fouls drawn, and — the real differentiator — measured minutes and plus/minus reconstructed from substitution timestamps and score deltas, not estimates.",
  },
  {
    question: "What makes Impact IQ's analysis different from every other basketball app?",
    answer:
      "Depth nobody else in this space matches. AI handles the tedious part — reading a photo of a box score in seconds. Real statistics handle the rest: a from-scratch RAPM-style Impact Rating, plus/minus reconstructed from actual substitution timestamps, PIR/PER/PIE, Four Factors, and scouting-report insights generated the moment a game ends. Most apps stop at points and rebounds — Impact IQ goes as deep as a professional analytics team.",
  },
  {
    question: "Does Impact IQ use AI?",
    answer:
      "Yes — AI reads your box score photos so you never type a stat line by hand, a capability nobody else offers at this level. From there, the analytics engine takes over: the same statistical techniques real basketball analytics teams use, applied to every game, every player, automatically.",
  },
  {
    question: "Can I track a team across multiple competitions in one season?",
    answer:
      "Yes. A team playing its domestic league, a national cup, and a continental competition in the same season has each competition's stats correctly isolated, and you can also view them combined across all competitions.",
  },
  {
    question: "Is there an iOS or Android app?",
    answer:
      "Impact IQ is available today as a Windows desktop app, with iOS and Android on the way. Scan the QR code on the Platforms page for early access and we'll notify you the moment mobile is live.",
  },
  {
    question: "What happens to my data if I join a team account?",
    answer:
      "Your personal data is soft-deleted when you join a team, not hard-deleted — nothing is ever permanently destroyed in that process.",
  },
  {
    question: "How is the Upload add-on billed differently from the base plan?",
    answer:
      "The base Individual or Team plan covers the app and every stat, chart, and insight. The Upload add-on is a separate, tiered plan that only covers photo-upload quota, because each photo scan costs us real API money. Play-by-play import is unlimited and free on any plan, since it's parsed locally.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes — full Excel export, plus shareable branded PNG report cards for a single game or a player/team's full season, ready to send to a coach or post.",
  },
  {
    question: "Do you offer plans for leagues, federations, or large clubs?",
    answer:
      "We're building toward professional league-integration deals for organizations that want their competition's data handled directly. Reach out from the Pricing page and we'll talk through what that looks like.",
  },
];
