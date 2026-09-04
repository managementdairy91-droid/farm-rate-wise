import { createFileRoute } from "@tanstack/react-router";
import { Bullets, CONTACT, LegalLayout, Section } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";

const title = "Delete Your Account & Data — DairyPro ERP";
const description =
  "How to delete your DairyPro account and associated data, what is removed, what is retained for legal reasons, and how long it takes.";

export const Route = createFileRoute("/delete-account")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://dairyproerp.lovable.app/delete-account" },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/delete-account" }],
  }),
  component: DeleteAccountPage,
});

const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Account deletion request — DairyPro",
)}&body=${encodeURIComponent(
  "Please delete my DairyPro account and data.\n\nRegistered mobile number:\nRegistered email:\nDairy / centre name:\nRole (Owner / Seller):\n",
)}`;

function DeleteAccountPage() {
  return (
    <LegalLayout
      title="Account & Data Deletion"
      subtitle="You can delete your DairyPro account and personal data at any time. Here are both ways to do it and exactly what happens to your records."
    >
      <Section heading="Option 1 — Delete from inside the app">
        <Bullets
          items={[
            "Open the DairyPro app and sign in.",
            "Go to Profile / Settings.",
            "Tap Account, then Delete Account.",
            "Confirm with your password or OTP. You will see a confirmation once the request is accepted.",
          ]}
        />
      </Section>

      <Section heading="Option 2 — Request deletion by email">
        <p>
          If you cannot sign in, email us from your registered email address or send your registered
          mobile number. We verify your identity before deleting anything.
        </p>
        <div className="pt-2">
          <Button asChild className="rounded-full">
            <a href={mailto}>Email a deletion request</a>
          </Button>
        </div>
        <p>
          Or write to {CONTACT.email} / call +91 {CONTACT.phone} ({CONTACT.city}).
        </p>
      </Section>

      <Section heading="What gets deleted">
        <Bullets
          items={[
            "Your login credentials and authentication record.",
            "Your profile: name, mobile number, email address, dairy or centre name, role and preferences.",
            "Your device tokens and notification settings.",
            "Support messages linked to your account.",
            "Uploaded files or images associated with your account.",
          ]}
        />
      </Section>

      <Section heading="What we may keep, and for how long">
        <Bullets
          items={[
            "Milk collection and payment records required for the dairy's accounts are retained in the dairy's books, and after deletion are no longer linked to your personal profile.",
            "Financial and tax records may be retained for up to 8 years as required by Indian accounting and tax law, then deleted or anonymised.",
            "Anonymous, aggregated statistics that cannot identify you may be retained indefinitely.",
          ]}
        />
      </Section>

      <Section heading="How long it takes">
        <p>
          Deletion requests are actioned within 7 working days and completed, including removal from
          backups, within 30 days. Deletion is permanent — your data cannot be restored afterwards, so
          please export or note down any statements you need before requesting deletion.
        </p>
      </Section>
    </LegalLayout>
  );
}
