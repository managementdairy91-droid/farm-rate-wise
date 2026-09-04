# Legal & support pages for Google Play

Add the pages Google Play asks for before publishing the DairyPro app, styled exactly like the current site (same colours, Outfit headings, cards, header and footer).

## Pages to add

1. **Privacy Policy** (`/privacy`) — what data DairyPro collects (name, phone, email, milk collection records, payment/ledger entries), why, how it is stored and secured, who it is shared with (no selling of data), retention, children's data, user rights, and how to contact us. Includes a "last updated" date.
2. **Terms of Service** (`/terms`) — who may use the app, owner vs farmer accounts, acceptable use, accuracy of milk/rate data, subscription and billing, limitation of liability, suspension, governing law (Mandsaur, Madhya Pradesh, India).
3. **Account & Data Deletion** (`/delete-account`) — the page Play Console requires: step-by-step in-app deletion, plus a request-by-email route to management.dairy91@gmail.com, what gets deleted, what is kept for legal/accounting reasons and for how long, and the expected turnaround (within 30 days).
4. **Support** (`/support`) — contact card with email, phone, city, response hours, plus a short FAQ (login trouble, wrong rate chart, app download, data backup).
5. **Refund Policy** (`/refunds`) — paid plan billing cycle, trial, cancellation, when a refund is given, how to request one.

## Contact details used on every page

DairyPro — management.dairy91@gmail.com — 9165043258 — Mandsaur, Madhya Pradesh, India.

## Site wiring

- Footer gets a proper link group: Privacy, Terms, Refunds, Support, Delete Account — replacing the current placeholder "Privacy" link.
- Each page shares one small header/footer layout so navigation back to the home page always works.
- Each page carries its own title, description, share text and canonical URL, and is listed in the sitemap.

## Technical notes

- New route files under `src/routes/`: `privacy.tsx`, `terms.tsx`, `delete-account.tsx`, `support.tsx`, `refunds.tsx`, plus a small shared `LegalLayout` component (header + footer + prose container) in `src/components/`.
- Reuse existing design tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `text-primary`, `glass-card`) — no new colours.
- Header/footer are currently defined inside `src/routes/index.tsx`; extract a lightweight shared version for the legal pages without changing the home page's look.
- Add each new path to `src/routes/sitemap[.]xml.ts`.
- Per-route `head()` with unique title/description/og tags and self-referencing canonical on `https://dairyproerp.lovable.app/...`.
- Pages are static content only — no database or backend changes.

Note: the policy text will be written as a solid, honest starting draft based on how DairyPro works; please read it once and tell me anything to correct, since it is a legal statement about your business.
