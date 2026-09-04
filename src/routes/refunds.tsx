import { createFileRoute } from "@tanstack/react-router";
import { Bullets, CONTACT, LegalLayout, Section } from "@/components/LegalLayout";

const title = "Refund & Cancellation Policy — DairyPro ERP";
const description =
  "DairyPro subscription billing, trials, cancellation and when a refund is issued for paid dairy management plans.";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://dairyproerp.lovable.app/refunds" },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/refunds" }],
  }),
  component: RefundsPage,
});

function RefundsPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      subtitle="How DairyPro paid plans are billed, how to cancel, and when we issue a refund."
    >
      <Section heading="1. Free trial">
        <p>
          New dairies can try the paid features free for the trial period shown at sign-up. No amount is
          charged during the trial, and you can cancel before it ends without paying anything.
        </p>
      </Section>

      <Section heading="2. Billing">
        <p>
          Paid plans are billed in advance for the chosen period (monthly or yearly) and renew
          automatically until you cancel. Applicable Indian taxes are added to the plan price.
        </p>
      </Section>

      <Section heading="3. Cancellation">
        <Bullets
          items={[
            "You can cancel any time from Settings → Subscription in the app, or by emailing " + CONTACT.email + ".",
            "Cancellation stops future renewals. Your plan stays active until the end of the period already paid for.",
            "Your records remain accessible in read-only form after the plan ends, until you delete your account.",
          ]}
        />
      </Section>

      <Section heading="4. When we issue a refund">
        <Bullets
          items={[
            "Within 7 days of your first paid subscription, if you are not satisfied and have not used the plan substantially — full refund.",
            "Duplicate or accidental double payment — full refund of the extra amount.",
            "A verified technical fault on our side that prevented you from using the service for more than 72 continuous hours — pro-rata refund or an extension of your plan, your choice.",
          ]}
        />
      </Section>

      <Section heading="5. When a refund is not available">
        <Bullets
          items={[
            "Renewals after the first 7 days of a new subscription period, where the service was available and used.",
            "Accounts suspended for breach of our Terms of Service.",
            "Requests based on incorrect data entered by the dairy or the seller, since the calculation follows the entries and rate chart provided.",
          ]}
        />
      </Section>

      <Section heading="6. How to request a refund">
        <p>
          Email {CONTACT.email} or call +91 {CONTACT.phone} with your registered mobile number, plan
          name, payment date and the reason. We reply within 3 working days, and approved refunds are
          returned to the original payment method within 7–10 working days.
        </p>
      </Section>
    </LegalLayout>
  );
}
