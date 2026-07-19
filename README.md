# Maison DnA

Bilingual (VI/EN) luxury fashion e-commerce site for Maison DnA — built with Next.js (App Router), Prisma/PostgreSQL, and next-intl. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full architecture, data model, and delivery roadmap.

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and other secrets
npm run db:migrate     # apply the Prisma schema to your database
npm run db:seed        # seed sample products, VIP tiers, and an admin user
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/vi` or `/en` based on browser language.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |

## Project structure

- `app/[locale]/` — bilingual storefront routes
- `app/admin/` — staff CMS/admin dashboard
- `app/api/` — route handlers, incl. payment webhooks
- `prisma/schema.prisma` — data model
- `lib/` — Prisma client, auth, payment provider adapters, validation schemas
- `components/` — `ui/` design-system primitives, `storefront/`, `admin/`
- `messages/{vi,en}.json` — i18n strings

## Design system

Minimalist Parisian direction: near-black/ivory palette with a gold accent, Bodoni Moda (display) + Jost (body). See `app/globals.css` for tokens.
