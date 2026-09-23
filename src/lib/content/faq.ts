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
    question: "What makes HoopStruct's analysis different from every other basketball app?",
    answer:
      "Depth nobody else in this space matches. AI handles the tedious part — reading a photo of a box score in seconds. Real statistics handle the rest: a from-scratch RAPM-style Impact Rating, plus/minus reconstructed from actual substitution timestamps, PIR/PER/PIE, Four Factors, and scouting-report insights generated the moment a game ends. Most apps stop at points and rebounds — HoopStruct goes as deep as a professional analytics team.",
  },
  {
    question: "Does HoopStruct use AI?",
    answer:
      "Yes — AI reads your box score photos so you never type a stat line by hand, a capability nobody else offers at this level. From there, the analytics engine takes over: the same statistical techniques real basketball analytics teams use, applied to every game, every player, automatically.",
  },
  {
    question: "Can I track a team across multiple competitions in one season?",
    answer:
      "Yes. A team playing its domestic league, a national cup — Greek Cup, Copa del Rey, Coppa Italia, Turkish Cup, Coupe de France, BBL-Pokal, LKL Cup, Israeli State Cup, and more — and a continental competition in the same season has each competition's stats correctly isolated, and you can also view them combined across all competitions.",
  },
  {
    question: "How confident should I be in the Impact Rating?",
    answer:
      "It ships with a visible confidence level — Very Low, Low, Medium, or High — based on how many play-by-play games actually back the number for that player or team. A thin sample is never presented as a settled rating. We'd also rather show one honest Impact Rating than two arbitrarily-different \"LEBRON\" and \"EPM\" numbers borrowed from formulas we can't fully reproduce — the proprietary tracking data that actually differentiates those commercial models isn't something we have, and we're not going to pretend otherwise.",
  },
  {
    question: "What is Shot Chart Entry?",
    answer:
      "Manual shot-location logging on a realistic half-court diagram — click anywhere on the court and the app silently classifies the zone (at-rim, mid-range, corner three, wing three, top-of-key three), then you type makes/attempts for a specific player or the team as a whole. You don't need both teams' data to save one team's shots, just both teams picked so the entry ties to the right game. It builds a per-player-per-zone breakdown and an automatic team-per-zone total as more players get entered, correctly, even across several sessions. No shot-tracking software or stats-company feed required — just a coach and a few minutes per game. Included on the Manual and Photo plans.",
  },
  {
    question: "How do players see their scouting reports?",
    answer:
      "A coach publishes a finished scouting report as a PDF straight from the desktop app to the whole roster. Each player opens the companion mobile app and always sees exactly the current report — never a stale one, never next week's game early. The coach gets a simple view back in the desktop app showing who's actually opened it. It's the first part of HoopStruct built for a player to use directly, not just a coach or analyst.",
  },
  {
    question: "Is there an iOS or Android app?",
    answer:
      "Yes, and it's real — but it's a different, narrower app than the desktop one, built specifically for players: it shows a player their team's current scouting report, published by their coach, and nothing else — no dashboard, no data entry. Coaches don't use it themselves; they publish from the desktop app. It's currently in TestFlight (iOS) and Play Store internal testing (Android), not a public store listing yet. Leave your email on the Platforms page and we'll add you as a tester.",
  },
  {
    question: "What happens to my data if I join a team account?",
    answer:
      "Your personal data is soft-deleted when you join a team, not hard-deleted — nothing is ever permanently destroyed in that process.",
  },
  {
    question: "What's the difference between the Manual, Photo, and Pro plans?",
    answer:
      "All three are annual, organization-wide subscriptions — one price per club or league, shared by every coach on staff. Manual (€200/year) is entry-only, no AI upload at all. Photo (€500/year) adds unlimited AI photo-upload box-score extraction plus play-by-play import. Pro (€4,000/year) is fully read-only: you never enter data yourselves — HoopStruct uploads and analyzes your league's games directly, and your whole organization gets full analytics access to it.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes — full Excel export, shareable branded PNG report cards for a single game or a player/team's full season, and a coach-facing advanced report (Excel and PDF) that ranks the full roster on every advanced metric, best to worst, as of any point in the season you choose — not just a full-season summary.",
  },
  {
    question: "Do you offer plans for leagues, federations, or large clubs?",
    answer:
      "Yes — that's exactly what the Pro plan (€4,000/year) is. It's fully read-only: your organization never enters a stat itself. HoopStruct uploads and analyzes every game in your league directly, and everyone on your staff gets full Dashboard, Four Factors, and scouting-report access to professionally maintained data, kept current game by game.",
  },
];
