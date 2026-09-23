"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MAX_STAGGER = 6;

// Everything already on screen on load is left alone (no flash); everything
// below the fold starts hidden and eases in as it scrolls into view.
function collectTargets(): HTMLElement[] {
  const targets: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();
  const add = (el: HTMLElement, index = 0) => {
    if (seen.has(el) || el.closest("[data-no-reveal]")) return;
    seen.add(el);
    el.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER) * 80}ms`);
    targets.push(el);
  };

  document.querySelectorAll<HTMLElement>("main section").forEach((section) => {
    section.querySelectorAll<HTMLElement>(":scope > div").forEach((container) => {
      Array.from(container.children).forEach((child) => {
        const el = child as HTMLElement;
        const isGrid = /\bgrid\b/.test(el.className) && el.children.length > 1;
        if (isGrid) Array.from(el.children).forEach((card, i) => add(card as HTMLElement, i));
        else add(el);
      });
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => add(el));
  return targets;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("reveal-in");
          // Drop the helper classes afterwards so they never fight with an
          // element's own hover/transition styles.
          timers.push(
            window.setTimeout(() => {
              el.classList.remove("reveal", "reveal-in");
              el.style.removeProperty("--reveal-delay");
            }, 1300)
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    for (const el of collectTargets()) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) continue;
      el.classList.add("reveal");
      io.observe(el);
    }

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
