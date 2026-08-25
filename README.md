# Tether-Zero — Marketing Website

A single-page marketing site for **Tether-Zero**, the personal-finance platform (debt
reduction, budgeting and household money management) by **Springthought**. Built with
Next.js (App Router) + TypeScript + Tailwind CSS. This site *sells* the product; it is
not the product itself.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (must pass clean)
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals)
```

Requires Node 18.18+ (developed on Node 25).

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # <html>, fonts, SEO metadata, viewport/theme-color
│  ├─ page.tsx              # composes all sections in order
│  ├─ globals.css           # Tailwind layers, base styles, .btn/.card helpers
│  ├─ icon.svg              # favicon (TZ mark)
│  ├─ opengraph-image.tsx   # generated OG/Twitter card (next/og)
│  ├─ sitemap.ts            # /sitemap.xml
│  └─ robots.ts             # /robots.txt
├─ components/              # Nav, Hero, HowItWorks, Features, FeatureCard,
│                           # Spotlight, StrategySimulator, ComparisonTable,
│                           # Pricing, Faq, FinalCta, Footer, Screenshot, …
├─ content/
│  ├─ site.ts               # ⭐ ALL copy + pricing constants + URLs (edit here)
│  └─ assets.ts             # screenshot registry (src/alt/availability)
└─ lib/                     # fonts (self-hosted Inter), small utils
public/
├─ fonts/                   # Inter 400/500/600/700 (woff2)
├─ screenshots/             # product screenshots (from Figma)
└─ brand/                   # logo SVGs
```

`design-ref/` (git-ignored) holds the unzipped Tether-Zero design-system handoff used
as reference; it is not part of the app.

---

## Where to edit things

| You want to change… | Edit |
| --- | --- |
| **Any section copy** (headlines, features, FAQ, comparison rows) | `src/content/site.ts` |
| **Pricing numbers** (monthly/annual/trial, savings) | `PRICING` in `src/content/site.ts` |
| **App URLs** (sign-up / login / legal) | `APP_URLS` in `src/content/site.ts` |
| **Which nav links appear** | `NAV_LINKS` in `src/content/site.ts` |
| **Colors / type scale / radii / shadows** | `tailwind.config.ts` + `src/app/globals.css` |
| **Screenshots** | drop files in `public/screenshots/`, set `available: true` in `src/content/assets.ts` |
| **SEO / OG / domain** | `src/app/layout.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` |

The content module is string-first and centralized so it can be wrapped in an i18n
layer (en / fr / es) later without touching components.

### Pricing constants

```ts
// src/content/site.ts
export const PRICING = {
  trialDays: 30,
  monthly: 10.99,           // $/month
  annualPerMonth: 7.69,     // 10.99 × 0.70
  annualPerYear: 92.28,     // 7.69 × 12
  monthlyAnnualized: 131.88,
  annualSavingsPercent: 30,
  annualSavingsPerYear: 39.6,
};
```

The monthly/annual toggle defaults to **annual** with the "Save 30%" badge.

---

## Content grounding

Every feature claim is sourced from the Tether-Zero PRDs (`tether-core/docs/prd`). To
avoid fabrication, a few claims from the original brief were **deliberately dropped or
reworded** because the PRDs don't support them:

- ❌ **"Privacy mode / blur dollar amounts"** — no such feature exists in the PRDs
  (the only "blur" is the goal-image-reveal card). Removed.
- ⚠️ **"Encryption at rest"** (blanket) — only *bank credentials* are documented as
  encrypted (AES-256-GCM). Reworded to that specific, accurate claim.
- ✅ Confirmed and used: read-only Plaid access, AES-256-GCM-encrypted credentials,
  GDPR/CCPA data export & deletion, AI coach **"Zero"**, RBAC roles **Admin / Editor /
  Viewer**, en/fr/es localization, snowball/avalanche simulator, Freedom Horizon,
  insight cards (net worth, income vs expense, age of money, top payees), goals with
  25/50/75/100% milestones.

---

## Screenshots

Three frames were pulled from Figma (via the Figma MCP) into `public/screenshots/`:

| File | Source frame | Used in |
| --- | --- | --- |
| `hero.png` | Debt Crusher dashboard | Hero (`#home`) |
| `insights.png` | Insights dashboard | `#insights` |
| `coach.png` | Zero AI coach chat | `#coach` |

The `#debt-crusher` section uses an **interactive client-side simulator**
(`StrategySimulator.tsx`) instead of a static screenshot, which demonstrates the
snowball-vs-avalanche recalculation. It uses sample data and is clearly labeled
"Illustrative example — not financial advice."

To replace any screenshot: drop a new file in `public/screenshots/` (keep the filename
or update `src` in `assets.ts`) and ensure `available: true`. Missing assets fall back
to a branded placeholder automatically.

---

## Accessibility (WCAG 2.1 AA)

- Semantic landmarks (`header`/`nav`/`main`/`footer`/`section[aria-labelledby]`), a
  single `<h1>`, logical heading order, skip-to-content link.
- Keyboard-operable nav, mobile drawer (Esc to close), FAQ accordion, pricing/strategy
  toggles; visible focus rings everywhere; `aria-current` on the active nav link
  (IntersectionObserver scroll-spy).
- `prefers-reduced-motion` honored (Framer Motion reveals + a global CSS fallback).
- All images have meaningful `alt` text; the comparison table is a real `<table>` in a
  focusable scroll region.
- **Color contrast:** blue text/fills use **blue-700 `#1D4ED8`** (≈6.7:1) rather than
  blue-600 `#155DFC` (lower contrast) so white-on-blue and blue-on-white meet AA. Green text
  uses `#008236`. `#155DFC` is kept for decorative accents (`brand-bright`).

---

## Design-system notes / divergences

The shipped Tether-Zero design system (`Design.md`) describes the *app* as calm and
restrained — near-black primary actions, blue only as a ≤6px accent, "not a startup
marketing page." This marketing site intentionally follows the **brief's** explicit
direction for a modern fintech landing page while honoring the DS tokens (Inter type,
neutral ramp, semantic colors, borders-over-shadows, generous whitespace):

1. **Primary CTAs are blue-filled** (per the brief), not near-black as in the app DS.
2. Blue shade shifted to blue-700 for AA contrast (see above).
3. **Hero image** uses the Debt Crusher dashboard frame. The brief's hero frame is a
   Figma *Make* file (`/make/…`), which the Figma screenshot API does not support; the
   dashboard frame is a strong, on-brand substitute.

---

## `[PLACEHOLDER]` items — need product-owner confirmation before launch

(Also enumerated in `PLACEHOLDERS` in `src/content/site.ts`.)

1. **Sign-up / login URLs** — `https://app.tether-zero.com/register` and `/login`
   (confirmed for this build; re-verify before launch).
2. **Legal pages** (`/privacy-policy`, `/terms-of-service`) are hosted on this
   marketing site as the canonical copies; footer links are **confirmed live**
   (both resolve HTTP 200 in production via the CloudFront edge router). The
   same SMS/Plaid/Unsplash/CCPA sections are mirrored in the app (`tether-web`)
   — keep both in sync.
3. **Toll-Free A2P number confirmed** as `+1 (855) 529-5178` and filled into the
   Privacy Policy Mobile Messaging (STOP) section; register the A2P campaign
   under this same number.
4. **SMS HELP contact confirmed** as `support@tether-zero.com` and filled into
   the Privacy Policy Mobile Messaging (HELP) section.
5. **Legal "Last Updated" / effective date** set to the publish date (June 19,
   2026) across both repos; update when the policy is next materially revised.
6. **Brand/DBA confirmed** as "Tether-Zero" (hyphen), legal entity
   "SpringThought, LLC." Renamed across shipped src + tests in both repos with
   explicit "doing business as" language; the app's Terms entity was corrected
   from "Tether Zero, Inc." to SpringThought, LLC. **Not yet updated:** internal
   docs/README/CLAUDE.md/design-ref (still say "Tether Zero"), and the es/fr
   legal intros lack the formal DBA clause (needs a translator). Register the
   A2P brand exactly as "Tether-Zero" to match the site and message content.
7. **Contact email domain unified** to the hyphenated `tether-zero.com` across
   both repos (`privacy@`/`legal@`/`support@`/`hello@`). Confirm these mailboxes
   exist before carrier submission. This marketing site is fully reconciled on
   the hyphenated apex domain (canonical/sitemap/robots/OG all use
   `https://tether-zero.com`, since CloudFront redirects `www` to apex).
   **Remaining:** the app repo (`tether-web` / `app.tether-zero.com`) still
   needs its page metadata/canonical URLs and JSON-LD checked for the
   non-hyphen domain (`tetherzero.com`) — fix in that repo.
8. **Contact address** (`hello@tether-zero.com`) is assumed; confirm.
9. **Annual pricing rounding** — `$7.69/mo`, `$92.28/yr` derived from `10.99 × 0.70`;
   confirm exact figures.
10. **Post-trial behavior** if the user doesn't subscribe (read-only vs. locked) — not
    specified in PRDs.
11. **Supported countries / banks** (Plaid coverage) — list not specified.
12. **Cancellation / refund policy** — not specified in PRDs.
13. **Mobile app availability / timeline** — the app is currently desktop-first per the
    design system.
14. **Competitive one-pager** (`marketing.pdf`) could not be parsed in this environment
    (no PDF renderer). The comparison matrix uses the brief-provided values; reconcile
    with the one-pager before launch.

Also note: **"No credit card required"** trial claim was **omitted** (not
confirmed) — this is a design decision, not a tracked placeholder. Add to the
hero/CTA copy only if true.

---

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion ·
lucide-react · self-hosted Inter. No backend; CTAs link to the app's sign-up/login
routes.

© 2026 Springthought.
