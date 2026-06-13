# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build (runs lint first implicitly via Next.js)
npm run start    # Serve production build locally
npm run lint     # ESLint with next/core-web-vitals
```

There are no tests configured.

## Architecture

**Next.js 14 App Router marketing site** for Tether Zero (personal finance SaaS). Single-page composition with client-side interactivity.

### Layered composition

1. `src/app/layout.tsx` — Root layout: SEO metadata, fonts, viewport
2. `src/app/page.tsx` — Composes all 11 sections in order
3. `src/components/` — Self-contained section components (all interactive ones are `"use client"`)
4. `src/content/site.ts` — **Single source of truth for all copy, pricing, URLs, nav links, and constants.** Components are presentation-only; all text lives here.
5. `src/content/assets.ts` — Screenshot registry with fallback placeholders

### Key components

- `Nav.tsx` — Sticky nav with IntersectionObserver scroll-spy + mobile drawer
- `StrategySimulator.tsx` — Interactive debt payoff calculator (snowball vs. avalanche); pure client-side, sample data only, not connected to real product
- `Reveal.tsx` — Framer Motion fade-up scroll animation with `prefers-reduced-motion` fallback
- `Screenshot.tsx` — Image with branded placeholder fallback (build passes before Figma exports land)
- `Pricing.tsx` — Billing toggle (monthly/annual) + pricing cards

### Styling

- Tailwind CSS with custom design tokens in `tailwind.config.ts`:
  - Brand teal: `#0F766E` (teal-700) — AA-safe for text contrast (~5.5:1)
  - `#0D9488` (teal-600) — decorative only, not for text
- Custom component helpers (`.btn`, `.card`, `.eyebrow`, `.section`) defined in `src/app/globals.css` as `@layer components`
- Path alias: `@/*` → `src/*`

### Content grounding

`src/content/site.ts` exports a `PLACEHOLDERS` object tracking 10 items that need product-owner confirmation before launch (sign-up URLs, legal links, supported countries, cancellation policy, etc.). See README.md for the full list.

### Public assets

- `public/fonts/` — Self-hosted Inter woff2 (weights 400/500/600/700)
- `public/screenshots/` — Product screenshots (hero, insights, coach); source from Figma
- `public/brand/` — `logo-full.svg`, `logo-mark.svg`
- `design-ref/` — Git-ignored Figma design system export bundle
