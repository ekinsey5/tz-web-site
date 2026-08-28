# Plan — /learn Index: Three-Column Grid + Curated "Budget Journey" Ordering

Status: awaiting approval. No implementation files touched yet.

## Phase 0 findings (repo reality vs. meta-prompt)

| # | Expected by meta-prompt | Found |
|---|---|---|
| 1 | `/blog` index route | `/learn`: `src/app/(en)/learn/page.tsx` + `src/app/[locale]/learn/page.tsx`, both thin wrappers over `LearnIndexPage` |
| 2 | Card component | Inlined in `src/components/pages/LearnIndexPage.tsx` (ul > li > article.card; icon chip + h2 title link + excerpt + "Read article" link) |
| 3 | Data loader with sort key | None — `ARTICLE_CARDS` array in `LearnIndexPage.tsx` is a hand-ordered manifest (currently newest-first). No sorting code exists |
| 4 | Frontmatter schema | No frontmatter/MDX. Copy lives in `messages/{en,fr,es}.json` (`Learn.articles.<key>`, `Articles.<key>`); registry `ARTICLES` in `src/content/site.ts` has `slug`, `path`, `datePublished` |
| 5 | Slugs per locale | 11 articles, EN/FR/ES parity confirmed (keys identical in all three message files) |
| 6 | Brand token = `#155DFC` | **Conflict.** `brand` = `#1D4ED8` (AA text-safe), `#155DFC` is `brand-bright` (decorative only) per CLAUDE.md + `tailwind.config.ts`. CLAUDE.md wins per the meta-prompt's own precedence rule. Default breakpoints (no custom `screens`); `max-w-container` = 1152px |
| 7 | Reusable grid/card patterns | `.card` helper in `globals.css`; homepage feature grids use `grid gap-6 md:grid-cols-2 lg:grid-cols-3`-style utilities |
| 8 | next-intl namespaces | `messages/{en,fr,es}.json`; index uses `Learn`, articles use `Articles.<key>` |
| 9 | Test setup | No site tests. `npm test` = `node --test "docs/infra/monitoring/*.test.mjs"`. Node v25 (native TS type-stripping) — `node --test` can import `site.ts` directly (it has zero imports) |
| 10 | PostHog calls | None anywhere; `posthog-js` not a dependency. Analytics **out of scope** (no new deps) |
| 11 | Scripts | `dev`, `build`, `start`, `lint`, `test` |

Also: no `.claude/rules/` directory exists. Cards have no images/tags/dates, so the meta-prompt's image-aspect-ratio and tag/date-row items are N/A.

## Decisions (user-confirmed)

- **Q1 ordering source:** manifest in `src/content/site.ts` (`LEARN_JOURNEY`), keyed by `ARTICLES` key — locale-agnostic by construction.
- **Q2 stages:** five fitted stages (below).
- **Q3 stage UI:** **visible h2 stage headings** before each group (new i18n keys ×3 locales).
- **Q4 missing entry:** strict — build fails, error names the offending key(s).
- **Q5 excerpt:** 3-line clamp. **Q6:** 2 cols at `md`, 3 at `lg`. **Q7 PostHog:** skipped (not installed).
- **Testing:** build-time guard + `node --test` unit tests; zero new dependencies.

## Stage mapping (every slug, with rationale)

| # | Stage (key) | Article key → slug | Rationale |
|---|---|---|---|
| 1 | `startHere` | `makingABudget` → making-a-budget | The generic "what/why/how of budgeting" primer; the only pure-mindset piece |
| 2 | `buildYourBudget` | `firstBudget` → your-first-budget | Smart Budget Wizard onboarding — literally building budget #1 |
| | | `envelopeBudgeting` → envelope-budgeting | The allocation method the first budget uses |
| | | `sinkingFunds` → sinking-funds | Completes the build: planned irregular expenses |
| 3 | `monthToMonth` | `irregularPaycheck` → irregular-paycheck | Operating the budget with variable income |
| | | `catchOverspendingEarly` → catch-overspending-early | Spending Pace — mid-month course correction |
| 4 | `crushDebt` | `payOffDebtFaster` → pay-off-debt-faster | Strategy first (snowball vs. avalanche) |
| | | `snowflakePayments` → snowflake-payments | Then the acceleration mechanism |
| | | `canIAffordThis` → can-i-afford-this | Then purchase decisions against the plan |
| | | `windfallInterceptor` → what-to-do-with-a-windfall | Then automated windfall capture |
| 5 | `coachRefine` | `aiFinancialCoach` → ai-financial-coach | The umbrella "Meet Zero" maintain/refine piece |

No article fits ambiguously enough to flag; `canIAffordThis` could arguably sit in stage 3, but its math and CTA are debt-payoff-centric, so stage 4.

The meta-prompt's "Get Set Up" stage has zero existing articles and is omitted; it slots in as a new stage entry when such articles land.

## Files to create / modify

| File | Change |
|---|---|
| `src/content/site.ts` | Add `LEARN_JOURNEY` (ordered stages → ordered article keys, typed against `keyof typeof ARTICLES`) and a module-scope `assertJourneyCovers(journey, keys)` guard exported for tests and invoked at import time — any missing/extra/duplicate key throws, failing `next build` with the key names |
| `src/components/pages/LearnIndexPage.tsx` | Replace `ARTICLE_CARDS` with an `ICONS: Record<ArticleKey, LucideIcon>` map (presentation stays here); render one `<section aria-labelledby>` per stage with an h2 heading and a grid `<ul>`; demote card titles h2 → h3 (new hierarchy: h1 page, h2 stage, h3 card); equal-height cards, 3-line excerpt clamp; widen wrapper from `container-tz max-w-prose` to `container-tz`; make the redundant "Read article →" link `aria-hidden` + `tabIndex={-1}` so each card has one accessible name / one tab stop (the title link) |
| `messages/en.json`, `messages/fr.json`, `messages/es.json` | Add `Learn.stages.*` (5 keys, values below) |
| `test/learn-journey.test.mjs` | `node --test` suite importing `site.ts` via Node 25 type-stripping |
| `package.json` | Extend `test` glob to include `test/*.test.mjs` |
| `CLAUDE.md` | Short note: new /learn articles must be added to `LEARN_JOURNEY` or the build fails |
| `.agents/plans/blog-grid-and-ordering.md` | This plan |

Nothing else is touched. No new dependencies.

## Ordering algorithm (pseudocode)

```
orderedKeys = LEARN_JOURNEY.flatMap(stage → stage.articles)
if duplicates(orderedKeys)             → throw Error("duplicate journey entries: …")
if set(orderedKeys) ≠ set(ARTICLES keys) → throw Error("missing from journey: […]; not in ARTICLES: […]")
render = for each stage: h2(t(`stages.${stage.id}`)) + grid(stage.articles map Card)
```

Tiebreak: N/A by design — the manifest is a total order, and the strict guard (Q4-a) makes a partial manifest a build failure rather than something to tiebreak. If the guard were ever relaxed to lenient, the documented fallback is `datePublished` desc, then slug asc.

## Grid classes & card skeleton

```jsx
<section aria-labelledby={`stage-${id}`} className="mt-12 first:mt-10">
  <h2 id={`stage-${id}`} className="text-2xl font-bold text-ink-strong">{t(`stages.${id}`)}</h2>
  <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <li key={key}>
      <article className="card flex h-full flex-col p-6">
        <span aria-hidden className="…icon chip (unchanged)…"><Icon /></span>
        <h3 className="mt-4 text-h3 text-ink-strong">
          <Link href={articleHref} className="hover:text-brand">{t(`articles.${key}.title`)}</Link>
        </h3>
        <p className="mt-3 text-body line-clamp-3">{t(`articles.${key}.excerpt`)}</p>
        <p className="mt-auto pt-4">
          <Link href={articleHref} aria-hidden tabIndex={-1} className="text-sm font-medium text-brand hover:underline">
            {t("readArticle")}<span aria-hidden> →</span>
          </Link>
        </p>
      </article>
    </li>
  </ul>
</section>
```

1 col base / 2 at `md` / 3 at `lg`; `flex h-full flex-col` + `mt-auto` give equal heights; `line-clamp-3` (Tailwind 3.4 built-in) clamps excerpts; all color via existing `brand`/`ink`/`body` tokens — no hex anywhere.

## New i18n keys (`Learn.stages.*`)

| Key | EN | FR | ES |
|---|---|---|---|
| `startHere` | Start Here | Commencez ici | Empieza aquí |
| `buildYourBudget` | Build Your Budget | Construisez votre budget | Construye tu presupuesto |
| `monthToMonth` | Run It Month to Month | Mois après mois | Mes a mes |
| `crushDebt` | Crush Your Debt | Écrasez vos dettes | Aplasta tus deudas |
| `coachRefine` | Refine with Your Coach | Affinez avec votre coach | Refina con tu coach |

## Tests (`test/learn-journey.test.mjs`, node:test, zero deps)

1. Real data: `assertJourneyCovers(LEARN_JOURNEY, Object.keys(ARTICLES))` does not throw.
2. Missing key: guard throws, message names the key (deliberately truncated copy of the manifest).
3. Extra/unknown key: guard throws, names it.
4. Duplicate key: guard throws, names it.
5. Flatten order: first key is `makingABudget`, last is `aiFinancialCoach` (journey shape).

## Verification gates

- 4.1 manifest: `npm test` green (guard suite). 4.3 grid: `npm run build`; inspect prerendered `/learn` HTML for `md:grid-cols-2 lg:grid-cols-3` + manual check at 375/768/1280px. 4.4: `grep -n "#[0-9A-Fa-f]\{6\}"` on touched files → nothing. 4.5: stage keys present in all three locale files (script check). 4.7: DOM order = manifest order in prerendered HTML for en/fr/es; heading hierarchy h1→h2→h3. 4.8 SEO: diff `<head>` of `/learn`, `/fr/learn`, `/es/learn` from the pre-change `.next` output vs. post-change — must be byte-identical. 4.9: `npm run lint`, `npm test`, `npm run build` all green, no new warnings.

## Commits (Conventional, in order)

1. `feat(learn): add journey ordering manifest with build-time completeness guard`
2. `feat(learn): render index as staged three-column grid`
3. `test(learn): cover journey manifest guard with node --test`
4. `docs(learn): document journey ordering convention`

## Rollback

The layout and manifest are additive and isolated: `git revert` of commits 1–2 restores the previous single-column, `ARTICLE_CARDS`-ordered index verbatim. No data migration; message-file additions (`Learn.stages.*`) are inert if unused.
