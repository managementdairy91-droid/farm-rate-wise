import { createFileRoute } from "@tanstack/react-router";
import { Bullets, CONTACT, LegalLayout, Section } from "@/components/LegalLayout";

const title = "Terms of Service — DairyPro ERP";
const description =
  "The terms that apply when dairy owners and milk sellers use the DairyPro app, ledger and subscription plans.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://dairyproerp.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="By creating an account or using the DairyPro app, you agree to these terms. Please read them carefully."
    >
      <Section heading="1. Eligibility and accounts">
        <p>
          You must be at least 18 years old and legally able to enter a contract to use DairyPro. You
          are responsible for the accuracy of the information you provide and for keeping your login
          credentials confidential. Accounts are of two kinds:
        </p>
        <Bullets
          items={[
            "Owner accounts: used by a dairy or collection centre to record milk intake, set rate charts and manage seller ledgers.",
            "Seller accounts: used by farmers to view their own collections, rates, deductions and payments.",
          ]}
        />
      </Section>

      <Section heading="2. What DairyPro does and does not do">
        <p>
          DairyPro is a record-keeping and calculation tool. We display rates and amounts based on the
          rate chart, fat and SNF values, and entries provided by the dairy owner or the milk testing
          equipment. We are not a party to the milk purchase, do not set milk prices, do not hold or
          transfer your money, and do not guarantee any payment between an owner and a seller.
        </p>
      </Section>

      <Section heading="3. Accuracy of data">
        <p>
          Owners are responsible for entering correct quantity, fat, SNF and rate chart values, and for
          correcting mistakes promptly. Sellers should review their entries regularly and raise any
          dispute with their dairy first. Any dispute over quantity, quality or payment is between the
          owner and the seller.
        </p>
      </Section>

      <Section heading="4. Acceptable use">
        <Bullets
          items={[
            "Do not use the app for unlawful purposes or to record false transactions.",
            "Do not attempt to access another user's data, reverse engineer the app, or disrupt our servers.",
            "Do not resell, sublicense or copy the app or its content without our written permission.",
            "Do not upload malware or abusive content.",
          ]}
        />
      </Section>

      <Section heading="5. Subscriptions and billing">
        <p>
          Some features are offered on paid plans. Plan prices, billing cycles and included limits are
          shown before you subscribe. Charges are billed in advance for the chosen period and, unless
          stated otherwise, renew automatically until cancelled. Taxes apply as per Indian law. Refunds
          are governed by our Refund Policy.
        </p>
      </Section>

      <Section heading="6. Suspension and termination">
        <p>
          You may stop using DairyPro at any time and delete your account. We may suspend or terminate
          an account that breaches these terms, is used fraudulently, or remains unpaid after notice. We
          will give reasonable notice where practicable and allow you to export your data.
        </p>
      </Section>

      <Section heading="7. Service availability">
        <p>
          We work to keep DairyPro available and reliable, but the service is provided "as is" without
          warranties of uninterrupted or error-free operation. Maintenance, network outages or events
          beyond our control may cause temporary downtime.
        </p>
      </Section>

      <Section heading="8. Limitation of liability">
        <p>
          To the maximum extent permitted by law, DairyPro is not liable for indirect or consequential
          loss, loss of profit, or loss arising from incorrect data entered by users. Our total
          liability for any claim is limited to the amount you paid us in the 3 months before the claim.
        </p>
      </Section>

      <Section heading="9. Intellectual property">
        <p>
          The DairyPro name, app, design and software are our property. Your business data remains
          yours; you grant us a limited licence to process it in order to provide the service.
        </p>
      </Section>

      <Section heading="10. Governing law">
        <p>
          These terms are governed by the laws of India, and the courts at Mandsaur, Madhya Pradesh
          shall have exclusive jurisdiction.
        </p>
      </Section>

      <Section heading="11. Changes to these terms">
        <p>
          We may update these terms; the revised date will appear above and continued use of the app
          after a change means you accept it. Questions? Email {CONTACT.email}.
        </p>
      </Section>
    </LegalLayout>
  );
}
