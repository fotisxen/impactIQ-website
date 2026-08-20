"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SCHEDULE_CALL_URL } from "@/lib/content/site";

export function StickyContactBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background-raised/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm font-medium text-foreground">
          Questions about your team&apos;s data? Let&apos;s talk.
        </p>
        <div className="flex items-center gap-3">
          <Button href="/contact" variant="secondary" className="flex-1 sm:flex-none">
            Contact us
          </Button>
          <Button href={SCHEDULE_CALL_URL} variant="primary" className="flex-1 sm:flex-none">
            Schedule a call
          </Button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="hidden h-9 w-9 shrink-0 items-center justify-center text-foreground-muted transition-colors hover:text-foreground sm:flex"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
