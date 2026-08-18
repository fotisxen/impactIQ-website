"use client";

import { useEffect, useRef, useState } from "react";
import { DataFlowScene } from "@/components/illustrations/DataFlowScene";

const TRACK_VW = 300;
const WINDOW_VW = 100;

type Card = {
  id: string;
  centerVw: number;
  top: string;
  eyebrow: string;
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    id: "input",
    centerVw: 50,
    top: "16%",
    eyebrow: "01 — Input",
    title: "One photo or one spreadsheet",
    body: "AI reads a box score photo, or a play-by-play export goes straight in — both produce a full stat line.",
  },
  {
    id: "processing",
    centerVw: 100,
    top: "64%",
    eyebrow: "02 — Processing",
    title: "Zero guesswork",
    body: "Every stat is recomputed from the actual data — not estimated, not padded.",
  },
  {
    id: "stats",
    centerVw: 150,
    top: "14%",
    eyebrow: "03 — Advanced stats",
    title: "8 real metrics, automatically",
    body: "PIR, PER, PIE, DOE, Net Rating, and a from-scratch RAPM Impact Rating — every game.",
  },
  {
    id: "insights",
    centerVw: 200,
    top: "62%",
    eyebrow: "04 — Insights",
    title: "Scouting reports, instantly",
    body: "Game, team, and player breakdowns written the moment the final buzzer sounds.",
  },
  {
    id: "charts",
    centerVw: 250,
    top: "18%",
    eyebrow: "05 — Charts",
    title: "6 ways to see it",
    body: "A purpose-built chart for every question — not the same bar chart, six times.",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function DataFlowWalkthrough() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height - viewportHeight;
      const traveled = -rect.top;
      setProgress(total > 0 ? clamp(traveled / total) : 0);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const panVw = progress * (TRACK_VW - WINDOW_VW);
  const windowCenterVw = panVw + WINDOW_VW / 2;

  return (
    <div ref={wrapperRef} className="relative h-[280vh]">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden border-y border-border bg-background">
        <div className="pointer-events-none absolute left-6 top-8 z-20 sm:left-10 sm:top-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
            Scroll to follow the data
          </p>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:right-10 sm:flex">
          {CARDS.map((card) => (
            <span
              key={card.id}
              className={`h-2 w-2 rounded-full transition-colors ${
                Math.abs(card.centerVw - windowCenterVw) < 25 ? "bg-accent-amber" : "bg-border-strong"
              }`}
            />
          ))}
        </div>

        <div
          className="relative h-full text-foreground-muted"
          style={{
            width: `${TRACK_VW}vw`,
            transform: `translateX(-${panVw}vw)`,
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0">
            <DataFlowScene />
          </div>

          {CARDS.map((card) => {
            const distance = Math.abs(card.centerVw - windowCenterVw);
            const opacity = clamp(1 - distance / 22);
            const translate = (1 - opacity) * 16;
            return (
              <div
                key={card.id}
                className="absolute w-56 rounded-xl border border-border bg-background-raised p-4 shadow-xl"
                style={{
                  left: `${card.centerVw}vw`,
                  top: card.top,
                  transform: `translate(-50%, ${translate}px)`,
                  opacity,
                  pointerEvents: opacity > 0.6 ? "auto" : "none",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
                  {card.eyebrow}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{card.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
