# SEO metadata — known gaps & recommendations

Companion notes to the Next.js Metadata API implementation (root layout,
per-page metadata, JSON-LD, sitemap/robots, manifest). Captures what's
intentionally deferred and what to do about it, so it isn't lost between
sessions.

## Coverage snapshot

| Route | Title | Canonical | hreflang | OG (title/desc/url/image) | Twitter | JSON-LD |
|---|---|---|---|---|---|---|
| `/` | inherited from root layout | ✅ | ✅ en-US + x-default | ✅ page-specific | ✅ page-specific | Organization, SoftwareApplication, FAQPage |
| `/privacy-policy` | ✅ own | ✅ own | ✅ own | ✅ own | ✅ own | Organization (site-wide, via layout) |
| `/terms-of-service` | ✅ own | ✅ own | ✅ own | ✅ own | ✅ own | Organization (site-wide, via layout) |

`sitemap.ts` / `robots.ts` / `manifest.ts` all confirmed present and valid.

## Known gaps

1. **No `twitter:site` / `twitter:creator`.** No social handles were
   provided when this was built. Add them to the `twitter` metadata object
   in `src/app/layout.tsx` (and the two legal pages, for consistency) once a
   handle exists.

2. **Homepage title/description exceed length guidelines.** The default
   title (`src/app/layout.tsx`) is ~68 characters and the description
   (`BRAND.description` in `src/content/site.ts`) is ~160 characters — both
   over the ~60/~155 char guidance search engines tend to truncate at. This
   is pre-existing marketing copy, not something introduced by the metadata
   work, and shortening it is a copywriting decision (out of scope for a
   pure metadata/technical-SEO pass). Revisit with whoever owns the
   marketing copy.

3. **Pricing and comparison content are homepage anchor sections, not
   routes.** `#pricing` and `#compare` live on `/` (see `Pricing.tsx`,
   `ComparisonTable.tsx` in `src/app/page.tsx`) — there's no standalone
   `/pricing` or `/vs-ynab` / `/vs-everydollar` page. Since the Next.js
   Metadata API is page-scoped, these can't carry their own title/description
   today. If targeting high-intent search terms like "YNAB alternative" or
   "debt avalanche app" matters, that requires **new pages**, not just new
   metadata — see Recommendations below.

4. **Legal pages' OG image lacks a cache-busting query hash.** The homepage
   image URL is auto-suffixed by Next's file-convention resolution (e.g.
   `/opengraph-image?a48996c9f651fb7a`); the legal pages reference the same
   image via an explicit `openGraph.images`/`twitter.images` array (see
   "Why the legal pages reference the image explicitly" below) and so serve
   a plain `/opengraph-image` URL with no hash. Cosmetic only — same image,
   marginally weaker cache invalidation if the image is ever changed.

5. **`SITE_URL` is a hardcoded constant**, not environment-derived. This was
   a deliberate choice (see Recommendations) given the site has a single
   production environment and static export deploy pipeline with no env
   vars configured anywhere today (`docs/infra/deployment-plan.md`).

6. **hreflang scaffold only covers `en-US`/`x-default`.** No `fr`/`es`
   entries exist because there are no localized routes yet (no `[locale]`
   segments, no middleware, no i18n library) — adding them now would point
   Google at pages that 404. `src/content/site.ts`'s file header already
   notes i18n is a planned-but-not-built layer.

## Recommendations

- **Submit `sitemap.xml` to Google Search Console** and re-validate once
  deployed (this repo's earlier redirect-tracking issue is unrelated and
  already resolved — see git history around the `SITE_URL` apex-domain fix).
- **Validate JSON-LD** (Organization, SoftwareApplication, FAQPage) with
  [Google's Rich Results Test](https://search.google.com/test/rich-results).
- **Run a Lighthouse SEO pass** against the deployed site.
- **If pricing/comparison SEO becomes a priority:** build dedicated static
  routes (e.g. `/pricing`, `/vs-ynab`, `/vs-everydollar`) that host that
  content (or a superset of it) so each can carry its own metadata — this is
  a content/routing project, not a follow-up metadata tweak.
- **When social handles exist:** add `twitter.site` / `twitter.creator`.
- **When `/fr`/`/es` routes are built:** extend the `alternates.languages`
  entries already scaffolded in `layout.tsx` and both legal pages'
  `metadata` exports.

## Why the legal pages reference the OG image explicitly

Worth recording since it's a non-obvious Next.js behavior: `opengraph-image.tsx`
(`src/app/opengraph-image.tsx`) only auto-attaches its image to the exact
route segment it lives in (`/`, the app root) via Next's file-convention
resolution. A child route that defines its own `openGraph`/`twitter` object
(as the legal pages now do, to get correct per-page title/description/url)
stops inheriting the parent's fully-resolved object — including the
auto-attached image — so it must reference the shared image explicitly.
`privacy-policy/page.tsx` and `terms-of-service/page.tsx` both import the
`alt`/`size` constants directly from `opengraph-image.tsx` to avoid
duplicating those values by hand.
