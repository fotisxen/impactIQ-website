"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ArenaCanvas = dynamic(
  () => import("./scene/ArenaCanvas").then((mod) => mod.ArenaCanvas),
  { ssr: false }
);

type Card = {
  id: string;
  peak: number;
  corner: "tl" | "tr" | "bl" | "br";
  eyebrow: string;
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    id: "doors",
    peak: 0.15,
    corner: "bl",
    eyebrow: "Tunnel",
    title: "Doors open.",
    body: "Warm-ups start. Somewhere courtside, a phone's already pointed at the box score.",
  },
  {
    id: "tipoff",
    peak: 0.4,
    corner: "tr",
    eyebrow: "Tip-off",
    title: "The clock starts.",
    body: "The first event lands before the ball hits the floor.",
  },
  {
    id: "live",
    peak: 0.62,
    corner: "br",
    eyebrow: "Half court",
    title: "Every possession, live.",
    body: "Shots, fouls, substitutions — timestamped as they happen, not after.",
  },
  {
    id: "buzzer",
    peak: 0.88,
    corner: "tl",
    eyebrow: "Final buzzer",
    title: "Game over. Report done.",
    body: "The box score, advanced stats, and scouting report are already waiting.",
  },
];

const CORNER_CLASSES: Record<Card["corner"], string> = {
  tl: "left-6 top-8 sm:left-10 sm:top-14",
  tr: "right-6 top-8 sm:right-10 sm:top-14",
  bl: "left-6 bottom-8 sm:left-10 sm:bottom-14",
  br: "right-6 bottom-8 sm:right-10 sm:bottom-14",
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ArenaWalkthrough() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      const next = total > 0 ? clamp(traveled / total) : 0;
      progressRef.current = next;
      setProgress(next);
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

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-y border-border bg-background">
        <div className="pointer-events-none absolute left-6 top-8 z-20 sm:left-10 sm:top-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
            Scroll to walk through
          </p>
        </div>

        {shouldMount ? <ArenaCanvas progressRef={progressRef} /> : null}

        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            boxShadow: "inset 0 0 160px 60px rgba(0,0,0,0.55)",
          }}
        />

        {CARDS.map((card) => {
          const opacity = clamp(1 - Math.abs(progress - card.peak) / 0.14);
          const translate = (1 - opacity) * 14;
          return (
            <div
              key={card.id}
              className={`pointer-events-none absolute z-10 w-56 rounded-xl border border-border bg-background-raised p-4 shadow-xl ${CORNER_CLASSES[card.corner]}`}
              style={{
                opacity,
                transform: `translateY(${card.corner.startsWith("t") ? -translate : translate}px)`,
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

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {CARDS.map((card) => (
            <span
              key={card.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                Math.abs(progress - card.peak) < 0.1 ? "bg-accent-amber" : "bg-border-strong"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
