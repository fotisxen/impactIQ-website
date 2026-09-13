import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-amber text-surface-inverted hover:bg-accent-amber-strong",
  secondary:
    "border border-border-strong text-foreground hover:border-accent-cyan hover:text-accent-cyan",
  ghost: "text-foreground-muted hover:text-foreground",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  disabled = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors ${VARIANT_CLASSES[variant]} ${className} ${
    disabled ? "pointer-events-none opacity-50" : ""
  }`;

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
