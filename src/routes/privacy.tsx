import { createFileRoute } from "@tanstack/react-router";
import { Bullets, CONTACT, LegalLayout, Section } from "@/components/LegalLayout";

const title = "Privacy Policy — DairyPro ERP";
const description =
  "How DairyPro collects, uses, stores and protects the data of dairy owners and milk sellers using the DairyPro app and platform.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://dairyproerp.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="This policy explains what information DairyPro collects when you use our Android app and web platform, why we collect it, and the choices you have."
    >
      <Section heading="1. Who we are">
        <p>
          DairyPro ("we", "us") builds a dairy management and smart ledger platform used by dairy
          collection centre owners and milk sellers (farmers). We operate from {CONTACT.city}. For any
          privacy question you can write to {CONTACT.email}.
        </p>
      </Section>

      <Section heading="2. Information we collect">
        <p>We only collect what is needed to run a milk collection and payment ledger:</p>
        <Bullets
          items={[
            "Account information: your name, mobile number, email address, dairy or centre name, and your role (owner or seller).",
            "Milk collection records: date and shift, quantity in litres, fat and SNF readings, calculated rate and amount.",
            "Ledger and payment entries: advances, deductions (feed, loans), cash or bank payouts, and settlement history recorded by the dairy owner.",
            "Device and usage information: app version, device model, operating system version, crash reports and basic usage events used to fix bugs and improve reliability.",
            "Support communication: messages, calls or emails you send us.",
          ]}
        />
        <p>
          We do not collect precise location, contacts, photos, SMS or call logs unless you explicitly
          share a file with us. We do not knowingly collect data from children under 13.
        </p>
      </Section>

      <Section heading="3. How we use your information">
        <Bullets
          items={[
            "To create and secure your account and let you sign in.",
            "To record milk collections and calculate rates, ledgers and payouts.",
            "To generate reports, slips and statements for the dairy owner and the seller.",
            "To send service messages such as collection summaries, payment confirmations and important account notices.",
            "To provide customer support, prevent fraud and misuse, and comply with legal obligations.",
            "To diagnose crashes and improve app performance.",
          ]}
        />
        <p>We never sell your personal data, and we do not use your ledger data for advertising.</p>
      </Section>

      <Section heading="4. Legal basis and consent">
        <p>
          We process your data to perform the service you signed up for, with your consent where
          required, and to meet our legal and accounting obligations. You may withdraw consent at any
          time by closing your account (see our account deletion page).
        </p>
      </Section>

      <Section heading="5. Sharing of information">
        <p>We share data only in these limited cases:</p>
        <Bullets
          items={[
            "With your dairy: a seller's collection and payment records are visible to the dairy owner or centre they supply milk to, and vice versa. This is the core purpose of the app.",
            "With service providers who host our database, send notifications or process payments, under agreements that require them to protect your data.",
            "When required by law, a court order, or a lawful request from a government authority.",
            "In connection with a merger or transfer of our business, with continued protection of your data.",
          ]}
        />
      </Section>

      <Section heading="6. Data storage and security">
        <p>
          Your data is stored on secured cloud servers with encryption in transit (HTTPS/TLS) and
          access controls so that each account can only read its own records. We use row-level access
          rules, password hashing and audited administrative access. No system is perfectly secure, so
          please keep your login credentials private and inform us immediately if you suspect misuse.
        </p>
      </Section>

      <Section heading="7. How long we keep data">
        <p>
          Active account data is kept for as long as your account exists. After account deletion, we
          remove your personal profile data within 30 days. Financial and transaction records may be
          retained for up to 8 years where Indian accounting and tax law requires it, and are then
          deleted or anonymised.
        </p>
      </Section>

      <Section heading="8. Your rights">
        <Bullets
          items={[
            "Access a copy of the data we hold about you.",
            "Correct inaccurate details such as your name, mobile number or a wrong entry.",
            "Delete your account and personal data (see the Delete Account page).",
            "Withdraw consent for non-essential notifications.",
            "Complain to us first at " + CONTACT.email + "; we respond within 7 working days.",
          ]}
        />
      </Section>

      <Section heading="9. Third-party links">
        <p>
          Our app or site may link to third-party services such as WhatsApp or a payment provider.
          Their own privacy policies apply to anything you do on their platforms.
        </p>
      </Section>

      <Section heading="10. Changes to this policy">
        <p>
          If we change this policy we will update the date above and, for significant changes, notify
          you in the app or by email before the change takes effect.
        </p>
      </Section>
    </LegalLayout>
  );
}
