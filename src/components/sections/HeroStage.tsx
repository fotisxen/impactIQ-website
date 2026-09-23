"use client";

import { useRef } from "react";
import { OrbitingBall } from "@/components/interactive/OrbitingBall";

export function HeroStage({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex w-full justify-center lg:justify-end">
      <div ref={panelRef} className="relative z-10 w-full max-w-sm">
        {children}
      </div>
      <OrbitingBall centerRef={panelRef} />
    </div>
  );
}
