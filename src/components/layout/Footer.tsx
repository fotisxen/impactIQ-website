import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="grid gap-12 py-16 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-amber font-mono text-sm font-bold text-surface-inverted">
              IQ
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              {SITE_NAME}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
            {SITE_TAGLINE}
          </p>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
              {column.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE_NAME}. Desktop app available now for Windows.
        </p>
        <p>Analysis nobody else in basketball provides.</p>
      </Container>
    </footer>
  );
}
