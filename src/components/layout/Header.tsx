"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, SITE_NAME } from "@/lib/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label={SITE_NAME} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/pricing" variant="primary">
            View pricing
          </Button>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground-muted hover:bg-background-raised hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/pricing" variant="primary" className="mt-2 w-full">
              View pricing
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
