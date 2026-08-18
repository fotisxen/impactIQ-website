# Impact IQ — Marketing Website Brief

This is a **separate project** from the desktop app (`boxscore-app`, an Electron + Angular app, lives in a sibling folder). This repo is a standalone Next.js marketing/SEO website for the same product, branded **Impact IQ**.

## What the product actually is (source of truth — don't invent features)

Impact IQ is a desktop app (Electron, built and working) that turns basketball box scores into real analytics. It has two ways to get data in, both already built and working:

1. **Upload a photo** of a printed/screenshotted box score — Claude AI (Anthropic) reads it via OCR and extracts a full stat line for both teams. Costs the business real API money per upload, so it's the metered/paid part of the product.
2. **Import a play-by-play Excel export** (EuroLeague-style, e.g. from a stats company) — parsed **locally, zero API cost**, and produces a *more accurate* box score than the photo path: exact FT splits, exact shot types, fouls-drawn (from "fouled on X" events), and — the genuine differentiator — **real, measured minutes and plus/minus**, reconstructed from substitution timestamps and score deltas. No other consumer-facing tool in this space does this from a spreadsheet import as far as we've found.

From there, the app computes:

- **Standard stats**: full basic box score (PTS/REB/AST/STL/BLK/TOV/PF/PFD/+‑/MIN).
- **Advanced stats, done honestly**: PIR (EuroLeague-style), PER (Hollinger-style, pace-adjusted), PIE (NBA's real formula), a from-scratch Impact Score, DOE — Dean Oliver's Four Factors + ORtg/DRtg, Net Rating (ORtg−DRtg for teams; for players, built from *real* +/- when play-by-play data exists), USG%, rebounding/ball-handling percentages, shooting splits — individual and team versions of each, always compared against real league averages (not the same thing padded twice — the app fixed a real bug where team-scale and player-scale comparisons were being conflated).
- **A real, from-scratch RAPM ("Impact Rating")** — the same core technique real industry metrics like LEBRON/EPM are built on (box score + adjusted plus-minus from lineup data), computed only from games that actually have play-by-play data behind them. *(Product fact, unchanged: the app internally never fabricates a number it can't back with real data. Site direction, updated 2026-08-12: don't market this as a "look how honest we are / we show N/A" angle — the user explicitly wants that framing gone, it reads as weak. Lead with capability and depth instead — "analysis nobody else provides" — not with disclaimers about what's missing.)*
- **Insights that read like a scouting report** (this is probably the "consulting" angle mentioned in the brief conversation) — three modes, all deterministic/rule-based (zero LLM cost, not "AI guessing"):
  - **Game Insights**: pick a saved game, get "what went well / what went less well" for both teams, at both team and player level — covers a normally-high scorer going cold, a low-volume player breaking out, a non-rebounder crashing the offensive glass, etc. — always compared against real season averages.
  - **Team scouting report**: strengths/weaknesses vs. the league average, key players (by real PIE), and — the sharpest one — **"how to beat them"**: the team's own numbers in losses vs. wins (turns it over more, gets outrebounded, allows more points — whatever the real pattern is), so an opposing coach knows exactly what to force.
  - **Player scouting report**: same strengths/weaknesses framing, plus how a player's own stat line differs in their team's wins vs. losses.
- **6 distinct, purpose-picked chart types** (not the same generic bar chart everywhere) — *updated 2026-08-12 to match the actual app*: an Opta-style radar for the Four Factors' shape, a shot chart plotting every make/miss on the floor, a win-probability chart tracking swings across the game, ridgeline plots for a stat's full-season distribution, bump charts for rankings shifting over time, and gravity/movement maps showing where the offense pulls attention and how the ball moves. Each opened from clicking the relevant stat, with a plain-English one-line explanation of what it shows.
- **Multi-competition support**: the same team/player can play across multiple leagues and cups in the same season (e.g. a Greek club playing its domestic league, national cup, and EuroLeague) — stats are correctly isolated per competition *and* viewable combined across all of them.
- **Shareable report cards**: export a player/team season or a single game as a clean branded PNG image, for sharing with a coach or posting.
- **Season-long leaderboards**, **team accounts with invite-based joining** (soft-deletes personal data on joining a team, nothing is ever hard-deleted), **Excel export**.

### Platforms

- **Desktop app**: built and shipping now (Windows via Electron; the codebase is cross-platform-capable).
- **Web**: this website itself is the web presence — the product's actual data/workflow is not a web app today, don't imply otherwise.
- **iOS and Android**: **planned, not built yet** (product fact, unchanged). *Site direction, updated 2026-08-12*: the user asked to "pretend the apps are already up" with QR codes/download buttons and no more "coming soon" language. Compromise actually built: real "Download for Windows" QR + button for Desktop (genuinely live, so this is honest), and a QR code for mobile too — but it points to the waitlist/early-access signup, not a fake App Store/Play Store link, since no real mobile app exists to download yet. Tone was pushed to sound imminent/confident ("early access," "on the way") rather than hedgy ("roadmap," "not built yet"), without claiming the apps are actually downloadable today. Do not add App Store/Play Store badges that link anywhere real or implied-real — that line still holds.

### Pricing (subject to change — build the pricing section so it's easy to swap)

Current live pricing in the app (Stripe, real, working):
- **Individual**: 8€/month or 86.40€/year (10% annual discount)
- **Team**: 15€/month + 6€ per seat from the 3rd seat onward, or 162€/year equivalent
- **Upload add-on** (photo/PBP quota): separate tiered plans (starter/pro/studio), billed separately from the base plan, since photo uploads cost real API money

**Open question, not yet decided**: whether to stay with this low-price/high-volume consumer model, or pivot toward a B2B/league-integration model (₤/€ 4,000–6,000/year per client — leagues, federations, or large clubs wanting their competition's data professionally integrated, similar in spirit to how basketballstatsassistant.com has a "Club — contact us" tier). **Build the pricing section as a self-contained, easily-editable component** (e.g. driven by a single data array/config) so it can be swapped or A/B'd later without restructuring the page. Don't hard-code a narrative that assumes one model over the other — lead with value/differentiation, keep pricing itself modular.

## Structural inspiration (NOT visual/content inspiration)

The user pointed at **basketballstatsassistant.com/en** as a *structural* reference — i.e. the shape of a SaaS marketing site (hero → feature sections → differentiation section → social proof → pricing → FAQ). Do **not** reuse their visual design, layout rhythm, color story, illustration style, copy, or section-for-section structure closely enough that it reads as derivative. The explicit ask is a **unique, modern, beautiful, distinct** design — treat the reference purely as "here's roughly what sections a site like this tends to have," not a template.

Rough section shape they have (for structural awareness only): Hero with store badges → feature highlight grid → "digitalize your competition" (league-integration angle) → "integrate your league's data" (B2B angle) → testimonials → trust logos → pricing (Free/Coach/Club) → FAQ.

## What to actually build

1. **Next.js (App Router, TypeScript, Tailwind)** — already scaffolded in this folder (`create-next-app` ran with `--typescript --tailwind --eslint --app --src-dir`).
2. A **genuinely unique visual identity** — don't default to generic SaaS-template blue/purple gradients. Push for something that feels like it belongs to a serious sports-analytics product (think: the visual language of broadcast sports graphics or a real analytics terminal, not a generic startup landing page). Dark-mode-forward is a reasonable direction given the desktop app's own dark theme, but make the call based on what looks best — theme-aware (light + dark) either way.
3. **Content architecture**, informed by the product facts above, roughly:
   - Hero: lead with *analysis depth nobody else provides* (see Tone below, updated 2026-08-12) — AI handles the photo capture, real statistics do everything after.
   - "Two ways in" — photo upload vs. play-by-play import, explained side by side, being clear that PBP unlocks real +/- and Impact Rating that photo/manual entry cannot.
   - Advanced stats section — show the actual metric names (PIR, PER, PIE, Impact Score, DOE, Net Rating, Impact Rating/RAPM) framed as capability, not hedged with confidence-labeling copy.
   - Insights/scouting section — this is the "no one else does this" differentiator; give it real weight, not a footnote.
   - Charts/visualization section — show off that the 6 chart types (see updated list above) are purpose-picked, not generic.
   - Two different interactive scroll-driven visuals, one per page (added 2026-08-12, updated same day):
     - **Home** — real "3D storytelling": a `react-three-fiber`/Three.js WebGL scene (a lit, textured low-poly arena: procedural wood-plank court texture, painted key, white line markings, metallic orange rim, physical-material glass backboard, glowing cyan/amber scoreboard, tiered stands, tunnel) with a scroll-linked camera flying through it, plus floating 2D stat/chart cards. Lit with hemisphere + shadow-casting directional light + accent point lights (amber/cyan), fog, and ACES filmic tone mapping. Card copy tells a game-day narrative synced to scroll position (tunnel → tip-off → live play → final buzzer).
     - A real-photo version (a licensed Unsplash arena photo with a Ken Burns scroll pan, no WebGL) was tried in between and explicitly rejected by the user ("πολύ κακό" — went back to 3D). The lasting, useful piece of feedback from that whole back-and-forth: the court markings in the 3D scene weren't actually geometrically consistent — the key wasn't attached to the baseline, the hoop's support pole stood in the middle of the key, and the three-point arc's radius could clip the key/free-throw circle instead of clearing them. Rewrote `Court`/`Hoop` in `ArenaCanvas.tsx` around a small set of derived constants (`BASELINE_Z`, `KEY_LENGTH`, `FT_LINE_Z`, `RIM_Z`, `THREE_PT_RADIUS`, etc., all computed from a few anchors) so the markings are mutually consistent and hand-verifiable by the numbers, not just eyeballed. The three-point line is built as an arc (`TubeGeometry` along explicit computed points, not a rotated `TorusGeometry` — getting a ring's Euler rotation right by feel with no visual feedback available was too easy to get backwards) sized so its apex clears the free-throw circle by a real margin, handing off to two straight corner segments that run down to the baseline — same two-piece shape (arc + corners) a real three-point line actually has, rather than one arc stretched to reach the sidelines by itself. Order of attempts, for context: pseudo-3D CSS rotateX → 2D horizontal-pan SVG → wireframe-only 3D → lit/textured 3D → real photo (rejected) → lit/textured 3D with corrected court-marking geometry.
     - Note for future canvas/texture work: `Math.random()` called inside a hook during render (even `useMemo`) trips the `react-hooks/purity` eslint rule — generate at module scope via a seeded PRNG instead.
     - **Product** — a different, lighter 2D CSS/SVG horizontal-pan animation (the same mechanic as the earlier non-3D Home attempt, reused here deliberately since the user wanted the two pages' animations to differ), telling a different story: not a physical walkthrough, but the data pipeline — input → processing → advanced stats → insights → charts — as five connected nodes with floating cards, matching Product's actual page content instead of duplicating Home's arena narrative.
   - Platforms section — Desktop (available, QR + download) / iOS & Android (early access, QR to waitlist — see Platforms note above).
   - Pricing (modular, see above).
   - FAQ.
4. **SEO**: proper Next.js Metadata API usage per route, OpenGraph + Twitter card images, JSON-LD structured data (SoftwareApplication + Organization at minimum), `sitemap.ts` and `robots.ts`, semantic heading structure, fast Core Web Vitals (optimize images via `next/image`, avoid layout shift, minimal client JS where server components suffice).
5. **Fully responsive** — mobile-first, since a lot of organic/social traffic to a sports app site will be on phones.

## Tone / positioning (important — don't undersell this)

**Updated 2026-08-12 — supersedes the original honesty-first framing below.** The user explicitly reversed direction: don't foreground "we tell you when we don't know" as a trust angle — it reads as weak, not credible. Current positioning: **"We analyze basketball like no one else does — AI handles the easy part (reading a photo), real advanced statistics and RAPM-style analytics nobody else offers handle the rest."** Lead with unmatched depth/capability and the AI-powered capture angle, not with disclaimers.

<details><summary>Original framing (superseded, kept for context)</summary>

The honest positioning was: "We give you data you can actually trust, and tell you exactly how much to trust it — powered by AI for the easy part (reading a photo) and real statistics for the hard part (turning it into insight)." Lead with data quality and honesty, not "we have AI." Every competitor claims AI; almost none of them tell you when their advanced stats are unreliable. That was the original wedge — no longer the direction.

</details>

## What's explicitly out of scope for this brief

- Don't build the actual mobile apps (not started).
- Don't wire real Stripe/payment on the website itself unless asked — pricing display only, unless a later instruction says otherwise (this crosses into "purchase/payment" territory that needs explicit user confirmation per this session's standing rules).
- Don't fabricate customer testimonials, logos, or user counts — the product has no public users yet. Leave those sections out or use honest placeholders clearly marked as such, don't invent quotes/names the way the reference site's are presumably real but ours would not be.

## Where this came from

This brief was generated from a conversation in a different Claude Code session (working on `boxscore-app`, the actual product). The user asked for this to be a fresh project + fresh chat specifically so this website work doesn't inherit that session's long history. If something here is ambiguous, ask — don't guess at product facts that aren't in this document.
