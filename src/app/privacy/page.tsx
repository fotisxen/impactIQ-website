import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/content/site";
import { LEGAL_ENTITY_ADDRESS, LEGAL_ENTITY_NAME, PRIVACY_LAST_UPDATED } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE_NAME} collects, uses and protects personal data.`,
  alternates: { canonical: "/privacy" },
};

const H = "mt-10 text-xl font-semibold tracking-tight text-foreground";
const P = "mt-3 leading-relaxed text-foreground-muted";
const UL = "mt-3 list-disc space-y-2 pl-6 leading-relaxed text-foreground-muted";

export default function PrivacyPage() {
  return (
    <Section border={false}>
      <SectionHeading
        eyebrow="Legal"
        title="Privacy policy"
        description={`Last updated: ${PRIVACY_LAST_UPDATED}`}
      />

      <div className="mt-10 max-w-3xl">
        <p className={P}>
          This policy explains what personal data the {SITE_NAME} desktop app,
          companion mobile app and website collect, why, and what your rights
          are. It is written for coaches, analysts, players and club staff.
        </p>

        <h2 className={H}>Who is responsible for your data</h2>
        <p className={P}>
          {LEGAL_ENTITY_NAME}, {LEGAL_ENTITY_ADDRESS} ({"\u201C"}we{"\u201D"}), is the controller of
          the personal data described here. Contact:{" "}
          <a className="text-accent-amber underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <h2 className={H}>What we collect</h2>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Account data:</strong> email
            address, first and last name, an optional date of birth, your role
            (for example coach or player) and the club you belong to. Accounts
            are created for you by us or by your club; you do not sign up
            publicly.
          </li>
          <li>
            <strong className="text-foreground">Basketball data:</strong> box
            scores, play-by-play data, player and team statistics, scouting
            reports and notes, and the plays you draw. This includes the names
            of players and teams, which may include people who are not users
            of the app.
          </li>
          <li>
            <strong className="text-foreground">Box-score photos:</strong> when
            you use photo upload, the image is sent for processing. We keep
            only the extracted statistics and a fingerprint (hash) of the image
            used to avoid processing the same image twice. We do not store the
            photo itself.
          </li>
          <li>
            <strong className="text-foreground">Sign-in session:</strong> a
            session token stored on your device so you stay signed in until you
            log out.
          </li>
          <li>
            <strong className="text-foreground">Website:</strong> if you email
            us or request a call, we receive the details you send. If you join
            the mobile tester list, we receive your email address.
          </li>
        </ul>
        <p className={P}>
          We do not sell personal data, we do not show advertising, and the
          apps do not include third-party advertising or analytics trackers.
        </p>

        <h2 className={H}>Why we use it</h2>
        <ul className={UL}>
          <li>To provide the service: sign you in, store and analyse your data, generate reports.</li>
          <li>To publish scouting reports to the players of your club, and to show coaches who has opened them.</li>
          <li>To keep the service secure and to respond to support requests.</li>
        </ul>
        <p className={P}>
          Our legal bases are performance of our contract with you or your club,
          and our legitimate interest in operating and securing the service.
        </p>

        <h2 className={H}>Who processes data for us</h2>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Supabase</strong> hosts our
            database, authentication and file storage.
          </li>
          <li>
            <strong className="text-foreground">Anthropic</strong> processes
            box-score photos to extract statistics. Images are sent only when
            you use photo upload.
          </li>
          <li>
            Distribution platforms such as the Microsoft Store, Apple App Store
            and Google Play deliver the apps to you under their own policies.
          </li>
        </ul>
        <p className={P}>
          Some of these providers may process data outside the European
          Economic Area. Where they do, we rely on the safeguards they offer,
          such as standard contractual clauses.
        </p>

        <h2 className={H}>Who can see your data</h2>
        <p className={P}>
          Members of the same club see the data that club creates. Players see
          only the scouting report their coach has published to them. Our
          administrators can access data to provide support.
        </p>

        <h2 className={H}>How long we keep it</h2>
        <p className={P}>
          We keep account and club data while the account is active. When an
          account is closed we delete or anonymise its personal data, except
          where the law requires us to keep something longer.
        </p>

        <h2 className={H}>Your rights</h2>
        <p className={P}>
          Under the GDPR you can ask us to access, correct, delete or export
          your personal data, to restrict or object to its processing, and to
          withdraw consent where we rely on it. Email{" "}
          <a className="text-accent-amber underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          and we will reply within one month. You can also complain to the
          Hellenic Data Protection Authority (dpa.gr).
        </p>

        <h2 className={H}>Security</h2>
        <p className={P}>
          Data is encrypted in transit, and access is restricted by
          organisation-level rules in our database. No system is perfectly
          secure, so please use a strong, unique password.
        </p>

        <h2 className={H}>Children</h2>
        <p className={P}>
          {SITE_NAME} is built for clubs and is not directed at children under
          16. Accounts for younger players are created and managed by their
          club, which is responsible for having the required permissions.
        </p>

        <h2 className={H}>Changes</h2>
        <p className={P}>
          If we change this policy in a meaningful way we will update the date
          above and, where appropriate, tell you inside the app.
        </p>
      </div>
    </Section>
  );
}
