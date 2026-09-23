import { Mail, PhoneCall } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL, SCHEDULE_CALL_URL } from "@/lib/content/site";

export function ContactSection() {
  return (
    <Section id="get-in-touch">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's talk about your team."
        description="Questions about pricing, a club or league integration, or just want to see it on your own data first. Reach out."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background-raised p-7">
          <Mail className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-foreground">Email us</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            The fastest way to reach us: pricing questions, bug reports,
            feature requests, anything.
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}`}
            variant="primary"
            className="mt-6 w-full"
          >
            {CONTACT_EMAIL}
          </Button>
        </div>

        <div className="rounded-xl border border-accent-cyan/30 bg-background-raised p-7">
          <PhoneCall className="h-7 w-7 text-accent-cyan" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-foreground">Schedule a call</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Better for a club, league, or federation conversation. Tell us a
            bit about your team and we&apos;ll find a time.
          </p>
          <Button href={SCHEDULE_CALL_URL} variant="secondary" className="mt-6 w-full">
            Request a call
          </Button>
        </div>
      </div>
    </Section>
  );
}
