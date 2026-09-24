import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-strong px-3 py-1 font-mono text-xs uppercase tracking-wide text-foreground-muted">
      {children}
    </span>
  );
}

export function MetricBadge({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-accent-cyan">
      {code}
    </span>
  );
}
