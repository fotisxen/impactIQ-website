import { Monitor, Smartphone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { WaitlistForm } from "./WaitlistForm";
import { DownloadQr } from "./DownloadQr";
import { SITE_URL, DESKTOP_DOWNLOAD_URL } from "@/lib/content/site";

export function Platforms({ full = false }: { full?: boolean }) {
  return (
    <Section id="platforms">
      <SectionHeading
        eyebrow="Platforms"
        title="Get Impact IQ."
        description="Desktop is live today. iOS and Android are on the way — scan below for early access."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div id="desktop" className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Monitor className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-amber/40 bg-accent-amber/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-amber">
              Available now
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Desktop</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Built and shipping today for Windows. The full analytics engine —
            photo upload, play-by-play import, every advanced stat, chart, and
            scouting insight — runs here.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href={DESKTOP_DOWNLOAD_URL} variant="primary">
              Download for Windows
            </Button>
            {full ? (
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            ) : null}
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <DownloadQr
              url={DESKTOP_DOWNLOAD_URL}
              caption="Scan to grab the download link on your computer."
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background-raised p-7">
          <div className="flex items-center gap-3">
            <Smartphone className="h-7 w-7 text-accent-cyan" strokeWidth={1.5} />
            <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
              Early access
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">iOS &amp; Android</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            On the way, carrying the same analytics engine as desktop. Scan in
            or sign up below and we&apos;ll notify you the moment it&apos;s live.
          </p>
          <div className="mt-6 border-t border-border pt-6">
            <DownloadQr
              url={`${SITE_URL}/platforms#waitlist`}
              caption="Scan to join early access from your phone."
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
