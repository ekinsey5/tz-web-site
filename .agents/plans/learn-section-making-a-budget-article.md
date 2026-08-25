# Plan: Add "Learn" Section + "How to Make a Budget" Article — Tether-Zero Marketing Site

## Context

The marketing site (Next.js 14 App Router, static export, next-intl with en/fr/es) has no long-form content section. A fully drafted article exists at `docs/making-a-budget-with-zero-ai-coach.md` (FTC consumer.gov budgeting guide woven with Tether-Zero/Zero AI-coach features). Goal: publish it as the first piece of a new, repeatable "Learn" content section — localized, on-theme, WCAG 2.1 AA, wired into nav/footer/sitemap/SEO — such that future articles repeat Phases 2–5 of the user's content workflow with no new structural work.

**User decisions (Phase 2, confirmed):** new `/learn/` section with index; hard-coded TSX pages with all copy in `messages/*.json`; full en/fr/es localization; FTC attribution as de-emphasized footnote; AI-feature claims kept as-is (present tense); primary sign-up CTA → `APP_URLS.register`; text-only (no images). Content edit: normalize "Tether Zero" → "Tether-Zero" (confirmed brand). Analytics: none exists on the site → no instrumentation. Stale-color scan: zero hits for `#0D9488`/`#2563EB` repo-wide (clean).

**Step 0 of implementation:** copy this plan to `.agents/plans/` in the repo (plan mode forbade writing it there pre-approval), and run baseline gates (`npm run build`, `npm run lint`, `npx tsc --noEmit`) on the clean tree.

## Routes

| URL | Source |
|---|---|
| `/learn/` (+ `/fr/learn/`, `/es/learn/`) | learn index |
| `/learn/making-a-budget/` (+ `/fr/…`, `/es/…`) | article |

## File tree

### New files
```
src/app/(en)/learn/page.tsx                          — EN index route (thin)
src/app/(en)/learn/making-a-budget/page.tsx          — EN article route (thin)
src/app/[locale]/learn/page.tsx                      — fr/es index route (+ generateStaticParams)
src/app/[locale]/learn/making-a-budget/page.tsx      — fr/es article route (+ generateStaticParams)
src/components/LearnPageChrome.tsx                   — localized subpage chrome: skip link (fixes LegalPageLayout's gap), slim header (logo + back link + LanguageSwitcher), <main id="main">, Footer
src/components/ArticleCta.tsx                        — light end-of-article CTA panel (bg-brand-tint, btn-primary → APP_URLS.register); FinalCta NOT reused (homepage-tuned full-bleed band, wrong scale for 65ch prose)
src/components/pages/LearnIndexPage.tsx              — shared index body (HomePage.tsx pattern, takes locale prop)
src/components/pages/MakingABudgetArticlePage.tsx    — shared article body + Article/BreadcrumbList JSON-LD
```
No new layouts needed — existing root layouts wrap nested segments via RootDocument.

### Edited files
```
src/lib/seo.ts             — 3rd optional param `page?: {title, description}`; hasLocaleVariants → path === "/" || path.startsWith("/learn"); attach OG image re-reference when page set
src/lib/locale-links.ts    — export localizePath(); deep-link /learn paths in localizedHref (LOCALIZED_PREFIXES)
src/app/sitemap.ts         — 6 new entries with alternates language maps (trailing slashes)
src/content/site.ts        — LEARN_PATH, ARTICLES.makingABudget {slug, path, datePublished: "2026-08-24", sourceUrl}; FOOTER_LINKS + { id: "learn", href: LEARN_PATH, localized: true }
src/components/Footer.tsx  — locale-prefix flagged footer links via localizePath ("localized" in link guard); fix alt="Tether Zero" → "Tether-Zero" (adjacent one-liner, flagged in Phase 0)
messages/en.json           — Learn + Articles namespaces, Footer.links.learn
messages/fr.json           — same keys, French
messages/es.json           — same keys, Spanish
```

## Key edits (representative)

### seo.ts (strictly additive; existing callers pass no 3rd arg → byte-identical output)
```diff
+import { alt as ogAlt, size as ogSize } from "@/app/opengraph-image";
-export async function buildMetadata(locale: Locale, path: string): Promise<Metadata> {
+export async function buildMetadata(locale, path, page?: { title: string; description: string }) {
-  const hasLocaleVariants = path === "/";
+  const hasLocaleVariants = path === "/" || path.startsWith("/learn");
+  const ogImages = page ? [{ url: "/opengraph-image", ...ogSize, alt: ogAlt }] : undefined;
   ...
-  title: path === "/" ? { default, template } : undefined,
+  title: path === "/" ? { default, template } : page?.title,   // resolves against "%s · Tether-Zero"
+  description: page?.description ?? t("description"),
   // openGraph/twitter title+description use page?.x ?? defaults; images: ogImages
   // openGraph.type stays "website" (Article JSON-LD carries article semantics)
```
OG re-reference is REQUIRED: `app/opengraph-image.tsx` only auto-attaches at root; nested pages declaring `openGraph` lose it (documented pattern in `(en)/privacy-policy/page.tsx`). Paths passed WITH trailing slash (`"/learn/"`, `"/learn/making-a-budget/"`) matching `trailingSlash: true`.

### locale-links.ts
```diff
+const LOCALIZED_PREFIXES = ["/learn"];
+export function localizePath(locale: Locale, path: string): string {
+  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
+}
 export function localizedHref(targetLocale, pathname) {
   const unprefixed = stripLocalePrefix(pathname);
   if (LEGAL_PATHS...) return unprefixed;
+  if (LOCALIZED_PREFIXES.some((p) => unprefixed === p || unprefixed === `${p}/` || unprefixed.startsWith(`${p}/`))) {
+    const normalized = unprefixed.endsWith("/") ? unprefixed : `${unprefixed}/`;
+    return localizePath(targetLocale, normalized);
+  }
   return targetLocale === DEFAULT_LOCALE ? "/" : `/${targetLocale}/`;
 }
```
Without this the LanguageSwitcher silently dumps article readers on the homepage.

### Route file shape (all four; HomePage pattern)
```tsx
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Learn" /* or "Articles.makingABudget" */ });
  return buildMetadata(locale, "/learn/", { title: t("meta.title"), description: t("meta.description") });
}
export default function Page() { setRequestLocale(locale); return <LearnIndexPage locale={locale} />; }
```
`[locale]` variants additionally duplicate `generateStaticParams()` over `NON_DEFAULT_LOCALES` in EACH page file (documented dev-server quirk; copy the comment from `[locale]/page.tsx`). Deliberately omit `dynamicParams = false`. Server components take `locale` explicitly + `getTranslations({ locale, namespace })` per the repo's static-export convention — NEVER ambient form in server components.

## Messages schema

New namespaces added identically to en/fr/es (missing keys throw at prerender — land all three together; verify key-tree parity mechanically).

- **`Learn`**: `meta.title`, `meta.description`, `eyebrow`, `heading`, `subheading`, `readArticle`, `backToHome`, `backToLearn`, `breadcrumbHome`, `articles.makingABudget.{title, excerpt}`. Chrome reuses existing `Nav.skipToContent` / `Nav.homeAriaLabel`.
- **`Articles.makingABudget`**: `meta.{title:"How to Make a Budget", description}`, `title` (full H1), `intro.{p1,p2}`, then sections `whatIsABudget`, `gettingReady`, `step1`–`step3`, `savings`, `finalThoughts` each `{heading, p1..pN}`; `step4.{heading, intro, li1..li4, partner}` (named keys, NOT arrays — repo-documented next-intl numeric-path limitation); `cta.{heading, body, button}`; `attribution`.
- **`Footer.links.learn`**: "Learn" / "Apprendre" / "Aprende".

**Rich text**: `t.rich()` with `<strong>`/`<em>`/`<link>` tags embedded in message strings (first `t.rich` usage in repo; supported by next-intl v4 server-side). Module-local `rich(key)` helper maps `strong → <strong class="font-semibold text-ink-strong">`, `em → <em>`. Attribution uses a `link` tag → `<a href={ARTICLES.makingABudget.sourceUrl} target="_blank" rel="noopener noreferrer">`. fr/es keep tag names identical (mismatch throws); keep `{`/`}` out of copy (ICU); product feature names follow existing fr/es Spotlights precedent (kept in English where the homepage does so).

**Content edits to the article**: "Tether Zero"→"Tether-Zero" throughout; title → single `<h1>`, `##` → `<h2>`; attribution moved from closing paragraph to small-print footnote; CTA block inserted between "Final Thoughts" and footnote; claims untouched (kept as-is per decision).

## Article page structure (MakingABudgetArticlePage)

`<article class="container-tz max-w-prose py-12 sm:py-16">` inside LearnPageChrome (back link → localized `/learn/`). One h1 (`text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl`), h2s styled like Markdown.tsx h2 (`mt-12 border-t border-ink/10 pt-8 text-2xl font-bold text-ink-strong`), paragraphs `mt-5 leading-relaxed text-body`, Step 4 as `<ol class="mt-5 list-decimal space-y-3 pl-6">`. Data-driven loop over uniform sections; hand-written intro/step4/tail. ArticleCta panel (`mt-12 rounded-2xl bg-brand-tint/60 p-8 text-center`, h2 `text-h3`, `btn-primary`). Attribution footnote: `mt-10 border-t border-line pt-6 text-xs text-muted`. All colors via tokens; no hard-coded hex.

## Metadata & JSON-LD

- Titles resolve via layout template → "Learn · Tether-Zero", "How to Make a Budget · Tether-Zero".
- Canonical per-locale (e.g. `/fr/learn/making-a-budget/`); hreflang `en-US`/`fr`/`es` + `x-default` → unprefixed path.
- **Article JSON-LD** (via existing JsonLd.tsx, at top of article component): `@type: Article`, `headline: t("title")`, `description: meta.description`, `inLanguage: locale`, `datePublished/dateModified: "2026-08-24"`, `mainEntityOfPage: {WebPage, @id: pageUrl}`, `image: ${SITE_URL}/opengraph-image`, `author: {Organization, name: BRAND.company /* SpringThought, LLC */, url: SITE_URL}`, `publisher: {Organization, name: BRAND.name, logo: {ImageObject, url: ${SITE_URL}/brand/logo-mark.svg}}`.
- **BreadcrumbList**: Home → Learn → article, localized names + URLs.
- Sitemap: 6 entries (learn ×3 locales priority 0.7 monthly; article ×3 priority 0.6 yearly) with `alternates.languages` maps mirroring the homepage-triple pattern.

## Nav decision

**Footer-only** (Company column via FOOTER_LINKS + localized flag; zero Nav.tsx changes). Rationale: NAV_LINKS is homepage scroll-spy machinery over `#anchors` (SECTION_IDS derived from hrefs); Nav is a client component with no locale plumbing; a "Learn" route link there needs `usePathname` + locale prefixing and pollutes the footer "Product" column. Revisit when Learn grows (minimal future change documented in design notes).

## Implementation order + gates

1. **Baseline**: `npm run build && npm run lint && npx tsc --noEmit` on clean tree; copy plan → `.agents/plans/`. STOP if red.
2. **Libs/constants**: site.ts, locale-links.ts, seo.ts. Gate: tsc + lint.
3. **Messages**: en.json fully, then fr/es translations; mechanical key-parity diff. Gate: build (catches JSON/ICU errors).
4. **Components**: LearnPageChrome, ArticleCta, LearnIndexPage, MakingABudgetArticlePage; Footer.tsx edit. Gate: tsc + lint.
5. **Routes + sitemap**: four page.tsx, sitemap.ts. Gate: `npm run build`, then inspect `out/`:
   - all 6 HTML files exist; `out/fr/learn/making-a-budget/index.html` has `lang="fr"`, translated title, canonical + 4 hreflang links, og:image, 3 JSON-LD scripts (Org + Article + Breadcrumb), exactly one h1, eight h2, `<ol>` with 4 `<li>`, consumer.gov link with `target="_blank" rel="noopener noreferrer"`, register CTA;
   - `out/sitemap.xml` has 6 new URLs with xhtml:link alternates;
   - homepage `<head>` (en + fr) unchanged vs baseline (buildMetadata regression check);
   - footer of `out/fr/index.html` → `/fr/learn/`, of `out/index.html` → `/learn/`.
6. **Dev sanity**: `npm run dev`; load `/learn/`, `/fr/learn/making-a-budget/` (confirms generateStaticParams duplication); exercise LanguageSwitcher on article (lands on sibling-locale article, `tz_locale` cookie set).
7. **A11y pass**: heading order, skip link, focus-visible on all links/CTA, keyboard nav, contrast (tokens only), `aria-current` unaffected.
8. **Cold-read self-review** per user's Phase 5 checklist; final gates green from clean state.

## Risks

- Message-key parity and `t.rich` tag mismatches across locales are prerender-time build breakers (deliberate: gates catch them).
- `buildMetadata` change must be strictly additive — verified by baseline-vs-after homepage head diff.
- fr/es article copy is model-drafted like the rest of the site — flag for native review alongside the existing docs/i18n caveats (not blocking).
- Footer "Product" anchors are dead on subpages (pre-existing on legal pages; out of scope — note as follow-up).

## Follow-up recommendations (post-ship)
Dedicated OG image for the article; native-speaker review of fr/es article copy; consider Nav "Learn" entry + more articles (workflow now repeatable: new message namespace + ARTICLES entry + 2 thin routes + sitemap lines); update stale CLAUDE.md/README architecture sections; docs/i18n + docs/seo notes refresh.
