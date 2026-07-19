# Maison DnA — Luxury Fashion E-commerce Website

## Context

Maison DnA is a new Vietnamese premium menswear/womenswear brand commissioning a $12,000, high-quality bilingual (VI/EN) e-commerce website. The client wants a Node.js-based site, source pushed to their existing GitHub account, and deployed on Hostinger. The working directory (`D:\01_Claude code`) is currently empty — this is a greenfield build, not a modification of existing code.

Through clarifying questions, the client confirmed: full e-commerce (not just a lookbook), a custom-built CMS/admin dashboard, bilingual VI/EN, "Minimalist Parisian" luxury visual direction, VNPay + MoMo + Stripe + PayPal + manual bank-transfer/COD payment support, a 50–300 SKU catalog, boutique appointment booking + VIP membership, and delegated the timeline and design-inspiration choices to us. No domain, no Hostinger plan, no logo/brand assets, and no legal/company info exist yet — the plan accommodates all of these as later drop-ins rather than blockers.

## Tech Stack (decisive)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router), TypeScript strict** | One codebase for storefront + admin; strong i18n/SEO for a bilingual catalog. |
| API | **Next.js Route Handlers** (`app/api/**`) | Avoids a second deployed service; one PM2-managed Node process. |
| Database | **PostgreSQL 16**, self-hosted on the VPS | Root-access VPS removes shared-hosting limits; native `unaccent`/`pg_trgm` for diacritic-insensitive Vietnamese search; strong Prisma support. |
| ORM | **Prisma** | Type-safe schema doubles as living documentation. |
| Auth | **Auth.js (NextAuth v5)** + Prisma Adapter | Customer sessions (with VIP tier) and staff sessions (role enum) via `/admin` middleware guard. |
| i18n | **next-intl** | Locale-prefixed routing (`/vi`, `/en`), Server Component + SEO metadata support. |
| Cart | Server-persisted cart (customer or guest-cookie token) + Zustand for client sync | Guest cart merges on login. |
| Images | Local `/uploads` volume + `sharp` resize-on-upload, Cloudflare (free) CDN in front | No real photography yet; `ProductImage` model needs no schema change once real assets arrive. |
| Email | Resend or Postmark | Order/booking confirmations; needs SPF/DKIM on the domain. |
| Validation | Zod (shared client/server) | |
| Testing | TS strict + Zod + a lean Playwright smoke suite (checkout + admin login) | Full coverage flagged as phase-2, out of $12k scope. |

No Turborepo/monorepo, no Docker — not justified at this budget for a solo-developer, single-VPS deployment. Folder structure keeps storefront/admin cleanly separated so it *could* split into `apps/` later.

## Folder Structure

```
app/
  (storefront)/[locale]/        home, collections, collections/[slug], products/[slug],
                                 cart, checkout(+confirmation), account/*, booking, vip,
                                 journal(+[slug]), about, contact, login/register, search
  admin/                        login, dashboard, products, collections, orders, customers,
                                 bookings, vip, editorial, settings, staff
  api/                          auth/[...nextauth], webhooks/{vnpay,momo,stripe,paypal},
                                 CRUD route handlers for admin
prisma/                         schema.prisma, seed.ts, migrations/
lib/                            payments/ (provider adapters + PaymentService), auth/, i18n/,
                                 db.ts, validations/
components/                     storefront/, admin/, ui/ (design-system primitives)
messages/                       en.json, vi.json
public/uploads/                 gitignored persistent volume
.github/workflows/               ci.yml, deploy.yml
```

## Data Model (Prisma, core entities)

Bilingual fields use paired columns (`nameVi`/`nameEn`) rather than JSON blobs — simpler for CMS forms and Postgres full-text indexing with only 2 locales.

- **Product** (slug, nameVi/En, descVi/En, basePrice, status, gender, material, collection) → **ProductVariant** (sku, size, color, priceOverride, stockQty) + **ProductImage** (url, altVi/En, sortOrder)
- **Collection** (slug, nameVi/En, descVi/En, heroImage)
- **Customer** (email, passwordHash, vipTier, lifetimeSpend) → Address[], Order[], Booking[]
- **Staff** (email, passwordHash, role: admin/manager/editor/fulfillment)
- **Cart** / **CartItem** (customer or guest token)
- **Order** (orderNumber, status: pending_payment→pending_confirmation→paid→processing→shipped→completed/cancelled/refunded, totals, shippingAddress, locale) → **OrderItem**
- **PaymentTransaction** (provider: vnpay/momo/stripe/paypal/bank_transfer/cod, providerTransactionId, status, rawPayload, confirmedByStaffId for manual methods)
- **VipTier** (nameVi/En, minSpend, perksVi/En, sortOrder) — v1 is spend-threshold auto-assignment + static perks, **not** a full points-redemption engine (flagged phase-2)
- **Booking** (customerId, slotStart/End, status: requested/confirmed/cancelled/completed/no_show)
- **BlogPost** (slug, titleVi/En, bodyVi/En, coverImage, publishedAt)

## Payment Abstraction

A single `PaymentProvider` interface (`createPayment`, `verifyWebhook`, `getStatus`) with one adapter per gateway under `lib/payments/`. `PaymentService.resolve(code)` picks the adapter at checkout.
- Stripe/PayPal use hosted Checkout/Payment Element (card PANs never touch our server → PCI SAQ-A).
- VNPay/MoMo use server-redirect + IPN/webhook confirmation; both require the client's own signed merchant credentials from their gateway portal (external dependency — see risks).
- Bank-transfer/COD orders sit in `pending_confirmation` until staff manually confirm in Admin → Orders.

## Deployment

- **GitHub**: single repo on the client's existing account, `main` protected, PR-based flow.
- **Hostinger plan: VPS (KVM 2: 2 vCPU/8GB/NVMe), Ubuntu 22.04** — not Cloud/Business shared hosting, which lacks root SSH for Postgres + a persistent Node process + custom Nginx config.
- **Domain**: not yet purchased — buy in Week 1 (`.com` vs `.com.vn` is a client call, both fine for luxury positioning).
- **Runtime**: Node LTS via `nvm`, **PM2** (cluster mode) running Next.js, **Nginx** reverse proxy + static `/uploads`, **Let's Encrypt** SSL auto-renew, **Cloudflare** free tier for CDN/DDoS.
- **CI** (`.github/workflows/ci.yml`): install/typecheck/lint/build on every PR.
- **CD** (`.github/workflows/deploy.yml`): on merge to `main`, SSH into the VPS, `git pull` → `npm ci` → `prisma migrate deploy` → `npm run build` → `pm2 reload`.
- **DB backups**: nightly `pg_dump` cron → off-site (Backblaze B2 or Hostinger's backup add-on).
- Note for the client: the $12,000 covers development; VPS (~$10–20/mo), domain (~$10–15/yr), and payment-gateway KYC are separate recurring costs they pay directly.

## Roadmap (~10 weeks + 1–2 week buffer, lean solo-developer scope)

1. **Foundation** — repo scaffold, Prisma schema, VPS provisioning, domain/DNS/Cloudflare, base app deployed end-to-end, design tokens wired in.
2–3. **Storefront core** — home, collections, PDP with placeholder imagery, `/vi`/`/en` routing, shared design-system components.
4–5. **Commerce core** — cart, checkout (payment stubbed), customer auth/account, admin shell + Product/Collection CRUD.
6. **Payments** — Stripe + PayPal (low risk, mature SDKs), manual bank-transfer/COD + admin confirmation UI, VNPay + MoMo (*risk: gated on external merchant approval, see below*).
7. **Order & catalog ops** — order management, inventory decrement, low-stock flags, filtering (size/color/material/price), Postgres full-text search w/ `unaccent`, pagination.
8. **Extras** — booking/appointment system, VIP tiers (spend-threshold + perks page).
9. **Content & polish** — editorial/blog CMS, About/Contact, legal/footer placeholders, bilingual QA, accessibility pass (targeting WCAG AAA per the chosen palette), responsive QA.
10. **Launch hardening** — PM2/Nginx cache tuning, image pipeline check, Lighthouse pass, bug bash, client UAT, compliance walkthrough, staff CMS training.

**Flagged risks:** VNPay/MoMo production credentials require the client's business registration docs (not ready yet) submitted to each gateway's own portal — build against sandbox first, treat production swap as a go-live gate rather than a Week 6 blocker. VIP points-redemption, automated e-invoicing, SMS reminders, and full test coverage are explicitly phase-2/out of scope.

## Visual Design System (from UI/UX pattern search)

- **Palette**: primary `#1C1917` (near-black), accent `#A16207` (WCAG-adjusted gold), background `#FAFAF9` (ivory), secondary `#44403C`, border `#D6D3D1`.
- **Typography**: Bodoni Moda (serif display) + Jost (sans body) — luxury, minimalist, high-end pairing.
- **Style keywords**: near-monochrome + gold accent, zero/minimal border-radius, no heavy shadows, sharp instant hover states, full-bleed editorial photography, generous whitespace, WCAG AAA achievable.
- **Inspiration references** (patterns/interaction only, never copying content or branding): The Row (whitespace, silent nav), Maison Margiela (full-bleed editorial PDPs), COS (grid browsing + filtering at scale), Jacquemus (hero storytelling, sticky add-to-cart).

## Pre-Launch Compliance Checklist (Vietnam e-commerce — administrative, not code)

- [ ] Display company name, address, tax code, business license in the footer (Nghị định 52/2013, 85/2021; Thông tư 47/2014) — once client provides legal info.
- [ ] File "Thông báo website TMĐT bán hàng" with MOIT via online.gov.vn before public launch.
- [ ] Bilingual Terms of Service / Return-Refund / Privacy Policy (ships with placeholder copy pending client's legal counsel).
- [ ] Decide e-invoice (Nghị định 123/2020) approach — flagged phase-2, client's accountant to confirm provider.
- [ ] Personal data consent notice per Nghị định 13/2023.
- [ ] Confirm Stripe/PayPal hosted checkout keeps PCI scope at SAQ-A.
- [ ] Site-wide HTTPS, no mixed content, before go-live.
- [ ] VNPay/MoMo merchant agreements signed + production credentials swapped in before go-live.

## Critical Files

- `prisma/schema.prisma`
- `lib/payments/PaymentService.ts` + adapters under `lib/payments/`
- `app/api/webhooks/{vnpay,momo,stripe,paypal}/route.ts`
- `lib/auth/` (Auth.js config, customer vs staff session logic)
- `.github/workflows/deploy.yml`
- `messages/en.json`, `messages/vi.json`

## Verification

- Local: `npm run dev`, walk through storefront (browse → PDP → cart → checkout with each payment method in sandbox mode) and admin (login → create product → confirm a manual-payment order → manage a booking) in both locales.
- CI: GitHub Actions must pass typecheck/lint/build on every PR before merge.
- Staging: deploy to the VPS behind a staging subdomain first; run the Playwright smoke suite (checkout + admin login) and a Lighthouse pass before pointing the production domain at it.
- Pre-launch: walk the compliance checklist above with the client before the site goes public.
