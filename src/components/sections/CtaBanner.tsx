import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBanner({
  title = "See your team's real numbers.",
  description = "Start with a photo, or import play-by-play for the full analytics engine: real plus/minus, RAPM, and scouting insights included.",
  primaryHref = "/pricing",
  primaryLabel = "View pricing",
  secondaryHref = "/product",
  secondaryLabel = "Explore the product",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="border-t border-border bg-surface-inverted">
      <Container className="flex flex-col items-start gap-6 py-20 sm:items-center sm:py-24 sm:text-center">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground-inverted sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-foreground-inverted/70">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground-inverted/25 px-5 py-3 text-sm font-medium text-foreground-inverted transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            {secondaryLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
