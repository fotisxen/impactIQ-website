import { Monitor, Smartphone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { STORE_LINKS } from "@/lib/content/stores";

const STORES: { key: keyof typeof STORE_LINKS; label: string }[] = [
  { key: "microsoft", label: "Microsoft Store" },
  { key: "macos", label: "Mac App Store" },
  { key: "ios", label: "App Store" },
  { key: "android", label: "Google Play" },
];

function StoreButton({ storeKey }: { storeKey: keyof typeof STORE_LINKS }) {
  const store = STORES.find((s) => s.key === storeKey)!;
  const url = STORE_LINKS[storeKey];
  return url ? (
    <Button href={url} variant="primary">
      {store.label}
    </Button>
  ) : (
    <Button href="/platforms" variant="secondary" disabled>
      {store.label} · Coming soon
    </Button>
  );
}

export function Platforms({ full = false }: { full?: boolean }) {
  return (
    <Section id="platforms">
      <SectionHeading
        eyebrow="Platforms"
        title="Get HoopStruct."
        description="Install it from the store you already use. Desktop for coaches and analysts, a companion app for players."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div id="desktop" className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Monitor className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-amber/40 bg-accent-amber/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-amber">
              Windows · macOS
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Desktop</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            The full analytics engine (photo upload, play-by-play import, every
            advanced stat, chart, and scouting insight) runs here. Install it
            from the Microsoft Store on Windows or the Mac App Store on macOS,
            and updates arrive automatically.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <StoreButton storeKey="microsoft" />
            <StoreButton storeKey="macos" />
            {full ? (
              <Button href="/pricing" variant="ghost">
                See pricing
              </Button>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Smartphone className="h-7 w-7 text-accent-cyan" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
              iOS · Android
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Player companion app</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            A different, narrower app built for players: it shows exactly your
            team&apos;s current scouting report, published by your coach, and
            nothing else. No dashboard, no data entry.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <StoreButton storeKey="ios" />
            <StoreButton storeKey="android" />
          </div>
        </div>
      </div>
    </Section>
  );
}
