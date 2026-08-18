import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This page didn&apos;t make the box score.
      </h1>
      <p className="max-w-md text-foreground-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
        you back to real data.
      </p>
      <Button href="/" variant="primary" className="mt-2">
        Back home
      </Button>
    </Container>
  );
}
