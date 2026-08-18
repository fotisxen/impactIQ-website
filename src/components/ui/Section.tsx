import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  id,
  className = "",
  grid = false,
  border = true,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  grid?: boolean;
  border?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 ${border ? "border-t border-border" : ""} ${grid ? "bg-grid" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
