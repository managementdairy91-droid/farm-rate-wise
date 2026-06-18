# Deploying DairyPro ERP to Vercel

This project is a TanStack Start SSR app that uses Lovable Cloud (Supabase) for
auth, database, and server functions. It has been configured to build for
Vercel via Nitro's `vercel` preset.

## 1. Push the project to GitHub

Use the GitHub button in Lovable, or push the repo manually.

## 2. Import the repo in Vercel

- New Project → Import your repo
- Framework Preset: **Other** (leave as detected; `vercel.json` handles it)
- Build Command: `vite build` (already set in `vercel.json`)
- Output: auto-detected from `.vercel/output/` (Nitro Vercel preset)

## 3. Add Environment Variables in Vercel

Copy these from your `.env` file (Project Settings → Environment Variables → Production + Preview):

Required (client + server):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Required (server-only, for admin/server functions):
- `SUPABASE_SERVICE_ROLE_KEY`
- `LOVABLE_API_KEY`

> The service role key and Lovable API key are **server-only** — never prefix
> them with `VITE_`.

## 4. Deploy

Click Deploy. Vercel will run `bun install` then `vite build`, which produces
`.vercel/output/` that Vercel serves as SSR Functions + static assets.

## 5. Connect your subdomain

In Vercel → Project → Settings → Domains, add `dairypro.ebundlestore.com`.
Vercel will show DNS records (typically a CNAME to `cname.vercel-dns.com`).
Update Hostinger DNS accordingly. SSL is provisioned automatically.

## Notes / Caveats

- Lovable Cloud (Supabase) keeps working on Vercel — it's just an HTTPS API.
- Google OAuth redirect URLs in Supabase must include your Vercel + custom
  domain URLs.
- Lovable Cloud previews still build for Cloudflare. The Nitro preset only
  switches to `vercel` when the `VERCEL` env var is set (Vercel sets this
  automatically during builds).
