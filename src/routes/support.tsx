import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, LegalLayout, Section } from "@/components/LegalLayout";

const title = "Support & Help Centre — DairyPro ERP";
const description =
  "Get help with the DairyPro app: contact our support team in Mandsaur, and answers to common questions about logins, rate charts, downloads and backups.";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://dairyproerp.lovable.app/support" },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/support" }],
  }),
  component: SupportPage,
});

const faqs = [
  {
    q: "I can't log in to the app.",
    a: "Check that you are using the mobile number or email you registered with, and that your internet connection is working. Use 'Forgot password' to reset it. If the problem continues, email us with your registered number and we will restore access.",
  },
  {
    q: "The rate shown for my milk looks wrong.",
    a: "Rates are calculated from the fat and SNF values and the rate chart set by your dairy. Ask your dairy owner to check the chart and the entry. If the entry itself is wrong, the owner can correct it and the ledger updates automatically.",
  },
  {
    q: "How do I install the Android app?",
    a: "Download the APK from the Download App button on our home page, then open the downloaded file and allow installation from your browser if Android asks. The app also becomes available on Google Play.",
  },
  {
    q: "Is my data backed up?",
    a: "Yes. All entries are saved to our secure cloud servers as soon as your device is online, so changing or losing a phone does not lose your records.",
  },
  {
    q: "How do I close my account?",
    a: "Use the Delete Account page for the in-app steps or to send us a deletion request by email.",
  },
];

function SupportPage() {
  return (
    <LegalLayout
      title="Support"
      subtitle={`We are a small team based in ${CONTACT.city}. Call or email us and we will get back to you quickly.`}
    >
      <Section heading="Support hours">
        <p>
          Monday to Saturday, 9:00 AM – 7:00 PM IST. Emails are answered within 24 hours on working
          days; urgent collection or payment issues are prioritised.
        </p>
      </Section>

      <Section heading="Frequently asked questions">
        <div className="space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <h3 className="text-base font-semibold text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </LegalLayout>
  );
}
