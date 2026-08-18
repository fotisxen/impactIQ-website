"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

// UI-only: no email service is wired up yet. Swap the onSubmit handler for
// a real endpoint (Formspree, ConvertKit, an API route, etc.) before launch.
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2.5 rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-3 text-sm text-accent-cyan">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        You&apos;re on the list — we&apos;ll email you the moment mobile ships.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        placeholder="you@club.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent-cyan focus:outline-none sm:w-72"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-amber px-5 py-3 text-sm font-medium text-surface-inverted transition-colors hover:bg-accent-amber-strong"
      >
        Notify me
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
