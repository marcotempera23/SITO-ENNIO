# enniotasciotti.com

Official personal website for **Prof. Ennio Tasciotti** — Scientist, Entrepreneur, Longevity Expert.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 (CSS-first, no tailwind.config.ts) |
| i18n | next-intl v4 — Italian (default) + English |
| Dark mode | next-themes v0.4.6 — `data-theme="dark"` attribute |
| Fonts | Fraunces (display), Inter (body), JetBrains Mono (data) |
| Animations | Framer Motion v12 |
| Email | Resend |
| Forms | react-hook-form + Zod |
| Icons | Lucide React |
| Package manager | pnpm 9 |
| Node | 20 LTS |

## Project Structure

```
app/
  [locale]/          # All pages under locale routing
    about/
    science/
      publications/
    ventures/
    longevity/
      [slug]/        # Article detail pages
    speaking/
    press/
    consultancy/
    contact/
    privacy/
    cookies/
  api/
    contact/         # POST — contact form
    newsletter/      # POST — newsletter sign-up
components/
  layout/            # Nav, Footer, ThemeToggle, LocaleSwitcher
  shared/            # SectionHeading, KpiCounter, Prose, CookieConsent, …
  home/              # Hero, ThreePillars, TedxEmbed, NewsletterCta, …
content/             # Static JSON data (publications, ventures, press, awards)
i18n/                # next-intl routing, request, navigation config
lib/                 # seo, schema, email, analytics utilities
messages/            # it.json, en.json translation files
styles/              # tokens.css (brand CSS variables)
```

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and fill in values
cp .env.example .env.local

# 3. Start dev server
pnpm dev

# 4. Open http://localhost:3000
```

## Build

```bash
pnpm build
pnpm start
```

## Environment Variables

See [`.env.example`](.env.example) for the full list.

## Internationalization

- Default locale: **Italian** (`/`) — no locale prefix
- English: `/en/…`
- Translations: `messages/it.json` and `messages/en.json`

## Deployment

The site is ready for deployment to **Vercel** (recommended) or any Node.js hosting.

```bash
vercel --prod
```

Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` runs on every push/PR:
lint → typecheck → build.

Set `RESEND_API_KEY`, `NEXT_PUBLIC_BASE_URL`, and `NEXT_PUBLIC_GTM_ID` as repository secrets.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
