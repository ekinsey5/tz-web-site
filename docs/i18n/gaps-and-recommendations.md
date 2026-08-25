# French/Spanish localization — known gaps & recommendations

Companion notes to the fr/es localization work (`messages/fr.json`,
`messages/es.json`, the `[locale]` route tree, the language switcher).
Captures what's intentionally deferred or flagged, mirroring the format of
`docs/seo/gaps-and-recommendations.md`.

## Translation quality — needs native-speaker review before launch

**All French and Spanish marketing copy in `messages/fr.json` and
`messages/es.json` was drafted by Claude, not a professional or native
translator.** It has not been reviewed. Treat it as a solid first draft, not
launch-ready copy. Specific risk areas to prioritize in review:

- **Idiomatic phrases translated somewhat literally.** English phrases like
  "every dollar has a job," "freedom date," and "snowflake" (a bonus/windfall
  payment applied to debt) don't have a single obvious fr/es equivalent —
  the current translations (e.g. `« flocon de neige »` / `«copo de nieve»`
  for "snowflake") are reasonable but worth checking against how the
  personal-finance community in each language actually talks about these
  concepts.
- **"Snowball" / "avalanche" debt-payoff strategy names.** Translated as
  "boule de neige" / "avalanche" (French) and "bola de nieve" / "avalancha"
  (Spanish) — these are the literal translations and seem to match how the
  strategies are commonly referred to, but should be verified against
  established fr/es personal-finance terminology rather than trusted as-is.
- **ICU plural categories** in `Simulator.monthsLabel` — French's "mois" is
  grammatically invariant (same form for one/many), Spanish's "mes"/"meses"
  changes. The `{months, plural, one {...} other {...}}` categories chosen
  should be verified against native speaker judgment, not just formal
  grammar rules.
- **French typography conventions** (e.g. a non-breaking space before `%`
  or `:`) were not applied — `Pricing.save`/`LegalPageLayout.lastUpdated`
  use a plain space. Cosmetic, but worth a pass if French typographic
  correctness matters for this audience.

## Legal pages stay English-only at every locale (deliberate, not a gap)

`/privacy-policy` and `/terms-of-service` are **not translated** and don't
get `/fr/privacy-policy` or `/es/privacy-policy` routes — a French or
Spanish visitor clicking through sees the same English legal page. This was
a deliberate scope decision, not an oversight:

- The content is compliance-sensitive: the SMS disclosure (`src/content/legal.ts`)
  contains carrier-vetted A2P verbatim phrasing, and the file's own header
  comment warns that bolded legal phrases are matched during Toll-Free/10DLC
  carrier vetting. Casually AI-translating this text risks breaking that
  vetting or introducing a legally material error.
- Professional/certified legal translation is out of scope for this pass —
  tracked here as explicit future follow-up, the same way the earlier
  `docs/seo/gaps-and-recommendations.md` deferred legal-page SEO polish.
- Practical consequence: switching languages from a legal page keeps you on
  that same English legal page (`src/lib/locale-links.ts`'s `localizedHref`
  has an explicit exception for this) rather than 404ing or inventing a
  fictional translated route.

## Other known gaps

- **OG image stays English-only at every locale.** `opengraph-image.tsx`'s
  generated PNG has baked-in English graphic text ("Become debt-free with a
  plan you can actually follow."). Translating it is a design task (redrawing
  the image), not a string swap — flagged as a follow-up, not solved here.
- **`manifest.ts` (PWA manifest) stays English-only.** Low priority — a
  per-locale manifest is possible later via `[locale]/manifest.ts` if the
  install-prompt text language becomes a priority.
- **No automatic browser-language redirect yet.** Locale detection today is
  manual only (the visible language switcher in `Nav`/`Footer`). A CloudFront
  Accept-Language-based redirect was scoped as a separate Phase 3 — see the
  plan this was built from for the design (root-path-only, cookie-gated,
  302, extending `docs/infra/cloudformation.yml`'s `EdgeRouterFunction`).
- **hreflang only covers `en-US`/`fr`/`es`+`x-default`.** No regional variants
  (e.g. `fr-CA`, `es-MX`) — if a specific dialect/region needs targeting
  later, that's a one-line change in `src/lib/seo.ts`'s `OG_LOCALE` map and
  the `alternates.languages` keys, not a structural change.

## A genuinely tricky bug worth recording (for future maintainers)

While wiring `[locale]` routing, ambient (implicit) locale detection —
`useTranslations("Namespace")` without an explicit locale, and
`getTranslations("Namespace")`/`getMessages()` the same way — returned the
**wrong locale inconsistently** across the same statically-generated page,
despite calling `setRequestLocale(locale)` in both the layout and the page
for `/fr/` and `/es/`. This is a documented limitation: Next.js can render
layouts and pages independently during static generation, and next-intl's
request-scoped locale cache (built on React's `cache()`) doesn't reliably
propagate to every nested Server Component under `output: "export"` with
multiple `generateStaticParams` values.

**The fix applied throughout this codebase:** every component that reads
translations now receives `locale` as an explicit prop and calls
`getTranslations({ locale, namespace })` / `getFormatter({ locale })` —
never the ambient string-only form. `RootDocument.tsx` also passes
`locale` explicitly to both `getMessages({ locale })` and
`NextIntlClientProvider`'s `locale` prop, since that's what ultimately feeds
translations to Client Components (`Nav`, `Pricing`, `Faq`,
`StrategySimulator`). If a new component is added later and it uses the
ambient form instead of explicit `locale`, it will likely render the wrong
language on `/fr/`/`/es/` in a way that's easy to miss in casual testing
(since it may partially work) — always thread `locale` explicitly.
