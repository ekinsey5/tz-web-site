# Meta Prompt — Blog Index: Three-Column Grid + Curated "Budget Journey" Ordering

## Context

You are working in the **Tether Zero marketing site** repository (Next.js App Router, TypeScript, Tailwind CSS, `next-intl` for EN/FR/ES, PostHog analytics). The blog index page currently renders every article as a single vertical stack, one card under the next, in whatever order the data source happens to yield (most likely publish date or filename).

Two changes are required:

1. **Layout** — Replace the vertical stack with a responsive **three-column grid** on desktop (collapsing gracefully to two columns on tablet and one on mobile).
2. **Ordering** — Replace the current sort with a **curated, editorially-controlled order** that walks a reader through the lifecycle of a budget: understanding why → getting set up → building the first budget → running it month to month → handling debt and goals → maintaining and refining over time. The order must be explicit and data-driven (e.g., a `journeyStep` or `order` field in frontmatter, or a central ordering manifest), never derived from string-sorting titles or dates.

Before writing any code, read `CLAUDE.md` and every file under `.claude/rules/`. Those instructions take precedence over anything below if they conflict.

---

## Hard Constraints (apply to every phase)

- **Brand color is `#155DFC`.** If you encounter `#0D9488`, `#2563EB`, or any other blue/teal masquerading as the primary brand color, treat it as a defect: flag it, do not propagate it, and do not introduce it. Any new accent, hover, focus ring, or "read more" link must resolve to `#155DFC` via the existing Tailwind token — never a hardcoded hex.
- **i18n:** EN/FR/ES parity is mandatory. If ordering metadata lives in frontmatter, every locale variant of an article must carry the same `order`/`journeyStep` value. If it lives in a manifest, the manifest must be locale-agnostic (keyed by slug). Any new UI string (e.g., a section heading like "Start here") goes through `next-intl` message files in all three locales. Change i18n **values**, not key names, when editing existing copy.
- **WCAG 2.1 AA:** The grid must remain a semantic list (`<ul>`/`<li>` or equivalent landmark structure), DOM order must match visual reading order (left-to-right, top-to-bottom, which is also the journey order), every card must have a single accessible name, focus indicators must be visible on every interactive element, and no information may be conveyed by color alone. Target ≥ 4.5:1 text contrast on card backgrounds.
- **SEO:** Do not regress existing metadata, `hreflang` alternates, canonical URLs, or structured data on the blog index. Static generation must be preserved — no client-side fetching to produce the list.
- **PostHog:** If you add or touch any event, names are `snake_case`, no PII, no raw values. A card click event should carry at most `article_slug`, `journey_step`, and `grid_position` (integer index).
- **No new dependencies** unless the dry-run plan explicitly justifies one and it is approved.
- **Plans** are written to `.agents/plans/blog-grid-and-ordering.md`.
- **Commits** follow Conventional Commits, scoped per feature area (e.g., `feat(blog): render index as responsive three-column grid`, `feat(blog): add journey-step ordering manifest`).

---

## Phase 0 — Read-Only Repository Scan

**No writes. No assumptions.** Locate and read the following, reporting exact paths and a one-line summary of each:

1. The blog index route (e.g., `app/[locale]/blog/page.tsx` or similar) and any layout wrapper it uses.
2. The component(s) that render an individual article card/list item.
3. The data-loading utility that enumerates articles (filesystem glob, MDX loader, content collection, CMS client, etc.) — note the current sort key and where it is applied.
4. Every article's frontmatter schema (list all fields currently in use across all articles and all locales). Confirm whether any field could already serve as an ordering key.
5. The complete list of existing article slugs and titles per locale. Confirm the EN/FR/ES counts match; report any orphaned or missing locale variants.
6. Tailwind config: confirm the brand-color token name that resolves to `#155DFC`, and confirm the configured breakpoints (`sm`/`md`/`lg`/`xl`).
7. Any existing grid or card patterns elsewhere on the marketing site (feature sections, comparison pages, pricing) that should be reused for visual consistency.
8. `next-intl` message file locations and the namespace used by the blog pages.
9. Existing test setup for the marketing site (unit test runner, Playwright/E2E, axe integration, visual regression if any).
10. Any PostHog capture calls currently on the blog index or card components.
11. The lint/format/typecheck/build commands defined in `package.json` scripts.

Output a concise "Phase 0 Findings" block. If anything expected is missing (e.g., no frontmatter, articles hardcoded in a TS array), say so plainly — that changes the plan.

---

## Phase 1 — Numbered Todo List

Produce a numbered list of **12–25 items** covering, at minimum:

- Introduce an explicit ordering mechanism (frontmatter field vs. central manifest — decision deferred to Phase 2).
- Define the journey stages and map every existing article to exactly one stage and one position within it.
- Update the loader to sort by journey stage → position, with a deterministic tiebreak (publish date desc, then slug) so builds are reproducible.
- Handle articles with **no** ordering metadata: fail the build (strict) or append to the end with a console warning (lenient) — decision deferred to Phase 2.
- Refactor the index to a responsive grid: 1 col base, 2 cols `md`, 3 cols `lg`+, using Tailwind grid utilities with consistent gap.
- Card refactor for grid density: equal-height cards, clamped excerpts (2–3 lines), image aspect ratio locked to prevent layout shift, tag/date row at bottom.
- Optional stage headers or a subtle "Step N of M" affordance on cards (decision deferred to Phase 2).
- i18n: add any new message keys to EN/FR/ES.
- Accessibility pass: semantic list, focus states, DOM-order check, heading hierarchy, axe scan.
- Keep static generation and metadata intact; verify `hreflang` output unchanged.
- Update or add unit tests for the sort function (including tiebreak and missing-metadata behavior).
- Add/adjust E2E or snapshot test asserting card order matches the manifest for at least one locale.
- Verify no hardcoded hex colors introduced; confirm all accents resolve to the `#155DFC` token.
- Run lint, typecheck, unit tests, build; confirm zero new warnings.
- Write plan to `.agents/plans/blog-grid-and-ordering.md`.
- Document the ordering convention in the repo (short section in `CLAUDE.md` or a `docs/blog-ordering.md` referenced from it) so future articles slot in correctly.

---

## Phase 2 — Clarifying Questions

Ask these **one at a time**, waiting for a single-letter answer before proceeding to the next. Each question includes a recommended default; if the answer is "default" or just "yes," use the recommendation.

**Q1. Where should ordering metadata live?**
- (a) A new `journeyStep` + `journeyOrder` pair in each article's frontmatter, duplicated across locales
- (b) A single central manifest (e.g., `content/blog/order.ts` or `order.json`) keyed by slug, locale-agnostic
- (c) A single `order` integer in frontmatter, no stage concept
- **Recommended: (b)** — one source of truth, no cross-locale drift, easy to reorder without touching 3× N files.

**Q2. What are the journey stages?** (Proposed; adjust names/count as you see fit.)
1. Why Budget — mindset, zero-based philosophy, YNAB/EveryDollar comparisons
2. Get Set Up — accounts, Plaid sync, household/partner invite, categories & groups
3. Build Your First Budget — To Be Budgeted, Balance to Zero wizard, sinking funds, income groups
4. Run It Month to Month — transactions, Smart Match, reconciliation, recurring templates, splits
5. Crush Debt & Fund Goals — Debt Crusher, Snowball vs. Avalanche, Freedom Horizon, snowflakes, financial goals
6. Maintain & Refine — insights dashboard, age of money, net worth, AI Coach Zero, month-end review, exports
- (a) Use these six as-is
- (b) Use these but collapse to four (merge 1+2, merge 5+6)
- (c) I'll supply my own list
- **Recommended: (a)**

**Q3. Should stage boundaries be visible in the UI?**
- (a) No — one continuous grid; order is implicit
- (b) Yes — a small stage heading (h2) precedes each group of cards; grid continues beneath each heading
- (c) Yes — a subtle "Step N" chip on each card, no headings
- **Recommended: (a)** for launch; it is the smallest change and avoids new i18n strings. Note that (b) is the most accessible if you want explicit structure later.

**Q4. Behavior for an article missing from the manifest (or without frontmatter ordering):**
- (a) Fail the build with a clear error naming the slug
- (b) Append to the end, sorted by date desc, and log a build-time warning
- **Recommended: (a)** — forces every new article to be placed deliberately.

**Q5. Card excerpt length in the three-column layout:**
- (a) Two-line clamp
- (b) Three-line clamp
- (c) No excerpt; title + image + date only
- **Recommended: (b)**

**Q6. Tablet (`md`) breakpoint column count:**
- (a) Two columns
- (b) Three columns already at `md`
- **Recommended: (a)**

**Q7. Add a PostHog `blog_card_clicked` event with `article_slug`, `journey_step`, `grid_position`?**
- (a) Yes
- (b) No, out of scope
- **Recommended: (a)** — low cost, useful for validating whether the curated order affects click-through.

---

## Phase 3 — Dry-Run Plan (approval gate)

Write the full plan to `.agents/plans/blog-grid-and-ordering.md` and echo it in chat. **Do not write any other file until the plan is explicitly approved.** The plan must contain:

- The finalized stage list and a table mapping **every** existing slug → stage → position, with a one-line rationale per placement. Call out any article that does not fit cleanly and propose where it goes anyway.
- Exact files to be created, modified, or deleted, with a sentence per file describing the change.
- The sort algorithm in pseudocode, including the tiebreak.
- The grid class string(s) and the card structure (as a JSX skeleton).
- New i18n keys (if any) with EN/FR/ES values.
- The list of tests to add/modify.
- Rollback note: how to revert to the previous ordering if the manifest approach is abandoned.

End with: "Reply **approve** to proceed, or list changes."

---

## Phase 4 — Phased Implementation

Execute in this order. After each step, run the relevant verification gate and report pass/fail before moving on. Stop and ask if a gate fails and the fix is not obvious.

**4.1 Ordering data** — Create the manifest (or frontmatter fields). Include every slug. Gate: typecheck passes; a quick script or test asserts manifest slugs == discovered slugs (no extras, no omissions).

**4.2 Loader sort** — Implement the sort with tiebreak and the missing-entry behavior chosen in Q4. Gate: unit tests for sort pass, including a test for a deliberately missing slug.

**4.3 Grid layout** — Refactor the index to the responsive grid. Keep the list semantic. Gate: build passes; manual check at 375px, 768px, 1280px widths shows 1/2/3 columns respectively with no horizontal scroll.

**4.4 Card refactor** — Equal heights, excerpt clamp, fixed image aspect ratio, brand-token accents only. Gate: `grep` for hardcoded hex in touched files returns nothing; build passes.

**4.5 Optional stage UI + i18n** — Only if Q3 ≠ (a). Gate: all three locale files contain the new keys; `next-intl` type generation (if used) passes.

**4.6 Analytics** — Only if Q7 = (a). Gate: event fires once per click with exactly the approved properties; no PII.

**4.7 Accessibility** — Run axe (via existing tooling or a one-off script). Verify keyboard tab order matches visual order. Gate: zero axe violations on the blog index for all three locales.

**4.8 SEO regression** — Diff the rendered `<head>` for the blog index before/after. Gate: `hreflang`, canonical, and title/description are byte-identical or intentionally improved.

**4.9 Full verification** — Lint, typecheck, unit, E2E, production build. Gate: all green, no new warnings.

**4.10 Documentation** — Add the ordering convention doc and, if appropriate, a short note in `CLAUDE.md` telling future sessions to add new articles to the manifest. Gate: doc references the actual file path.

Commit after each logical group using Conventional Commits.

---

## Phase 5 — Cold-Read Self-Review

Perform this as if you had **not** written the code. Do not validate against your own Phase 3 plan; instead, re-derive expectations from the original two-sentence request at the top of this document and from `CLAUDE.md`, then check the repository state against them.

Answer each item with **PASS / FAIL / N/A** and a one-line justification:

1. Opening the blog index at desktop width shows exactly three columns; at tablet two; at mobile one. No horizontal overflow at any width.
2. The first card a reader sees is a "why budget / getting started" article, and the last is a "maintain / refine" article. Reading left-to-right, top-to-bottom tells a coherent story.
3. The order is defined in one explicit place, and a newcomer could add an article and place it correctly by reading the docs alone.
4. Every existing article appears exactly once in every locale, in the same relative order.
5. Adding an article without an ordering entry produces the behavior chosen in Q4 (build failure or warning), and there is a test proving it.
6. No file touched in this change contains `#0D9488`, `#2563EB`, or any hardcoded hex; all accents resolve to the `#155DFC` Tailwind token.
7. The card list is semantically a list; each card has one accessible name; focus rings are visible; DOM order equals visual order.
8. Axe reports zero violations on `/blog` for EN, FR, and ES.
9. `hreflang`, canonical, title, and description on the blog index are unchanged from before the work began.
10. Static generation is intact — no `use client` was added to the page or loader solely to achieve the layout.
11. Any new i18n keys exist in all three locale files with real translations, not English placeholders.
12. Any PostHog event added is `snake_case`, carries only the approved properties, and contains no PII or raw values.
13. Lint, typecheck, unit tests, E2E, and production build all pass with no new warnings.
14. Commits are scoped and conventionally named; the plan file exists at `.agents/plans/blog-grid-and-ordering.md`.
15. Nothing outside the blog index and its direct dependencies was modified.

If any item is FAIL, fix it and re-run the checklist from the top before declaring the work complete. Finish with a short summary of what changed, where the ordering lives, and how to add the next article.
