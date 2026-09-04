import { Link } from "@tanstack/react-router";
import { Droplets, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

export const CONTACT = {
  name: "DairyPro",
  email: "management.dairy91@gmail.com",
  phone: "9165043258",
  city: "Mandsaur, Madhya Pradesh, India",
  updated: "4 September 2026",
};

const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/refunds", label: "Refund Policy" },
  { to: "/support", label: "Support" },
  { to: "/delete-account", label: "Delete Account" },
] as const;

export function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-elevated)]">
              <Droplets className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              DairyPro<span className="text-primary"> ERP</span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-6 py-14">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
          ) : null}
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
            Last updated: {CONTACT.updated}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-8">{children}</div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-bold">Contact us</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a className="hover:text-foreground" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a className="hover:text-foreground" href={`tel:+91${CONTACT.phone}`}>
                +91 {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {CONTACT.city}
            </li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>
            <span className="font-semibold text-foreground">DairyPro ERP</span> © {new Date().getFullYear()}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {legalLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
