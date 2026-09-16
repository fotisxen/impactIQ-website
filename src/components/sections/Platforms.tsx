import { Monitor, Smartphone, Apple } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { WaitlistForm } from "./WaitlistForm";
import { DownloadQr } from "./DownloadQr";
import { SITE_URL } from "@/lib/content/site";
import { getLatestRelease } from "@/lib/releases";

export async function Platforms({ full = false }: { full?: boolean }) {
  const release = await getLatestRelease();
  const hasAnyBuild = !!(release?.windows || release?.mac);
  const desktopPageUrl = `${SITE_URL}/platforms#desktop`;

  return (
    <Section id="platforms">
      <SectionHeading
        eyebrow="Platforms"
        title="Get Impact IQ."
        description="Desktop runs the full analytics engine, live today. A real player companion app is in testing — scan below to join."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div id="desktop" className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Monitor className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-amber/40 bg-accent-amber/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-amber">
              {hasAnyBuild ? `Available now · ${release?.version}` : "Coming very soon"}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Desktop</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Built and shipping today for Windows and macOS. The full analytics
            engine — photo upload, play-by-play import, every advanced stat,
            chart, and scouting insight — runs here.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {release?.windows ? (
              <Button href={release.windows.url} variant="primary">
                Download for Windows ({release.windows.sizeMb} MB)
              </Button>
            ) : (
              <Button href={desktopPageUrl} variant="primary" disabled>
                Download for Windows
              </Button>
            )}
            {release?.mac ? (
              <Button href={release.mac.url} variant="secondary">
                <Apple className="mr-1.5 -mt-0.5 inline h-4 w-4" strokeWidth={1.5} />
                Download for macOS ({release.mac.sizeMb} MB)
              </Button>
            ) : (
              <Button href={desktopPageUrl} variant="secondary" disabled>
                <Apple className="mr-1.5 -mt-0.5 inline h-4 w-4" strokeWidth={1.5} />
                Download for macOS
              </Button>
            )}
            {full ? (
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            ) : null}
          </div>
          {!hasAnyBuild ? (
            <p className="mt-3 text-xs text-foreground-muted">
              The installer is being finalized — check back shortly, or use the
              contact page to ask for early access.
            </p>
          ) : null}
          <div className="mt-6 border-t border-border pt-6">
            <DownloadQr
              url={desktopPageUrl}
              caption="Scan to open this page on your computer and pick your OS."
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Smartphone className="h-7 w-7 text-accent-cyan" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
              In testing
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Player companion app</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Real and working — but a different, narrower app than desktop,
            built for players: it shows exactly your team&apos;s current
            scouting report, published by your coach, and nothing else. No
            dashboard, no data entry. Currently in TestFlight (iOS) and Play
            Store internal testing (Android), not a public store listing yet.
          </p>
          <div className="mt-6 border-t border-border pt-6">
            <DownloadQr
              url={`${SITE_URL}/platforms#waitlist`}
              caption="Scan to join the tester list from your phone."
            />
          </div>
          <div id="waitlist" className="mt-6 scroll-mt-24">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
