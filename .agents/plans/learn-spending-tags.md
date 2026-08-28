# Plan — /learn article: "Beyond Categories" (tags)

Status: awaiting approval. No article files written yet.

## Front matter (proposed)

```yaml
topic: "Tags as cross-category cost tracking — answering 'what did X actually cost?'"
primary_feature_area: "Tags (+ transaction tagging, split-line tags, Zero's TAGS prompt library)"
target_reader: "new signup, pre- or just-post-onboarding"
primary_keyword: "track vacation spending"
secondary_keywords: ["spending tags", "track project costs budget app", "tax deductible expense tracking", "cross-category spending"]
word_count_target: "900-1300"
cta_goal: "start free trial"
slug: /learn/track-spending-with-tags
```

- **H1/title (user-supplied, typographic quotes):** "Beyond Categories: Answer “What Did the Vacation Actually Cost?” with Tags"
- **meta.title:** "What Did the Vacation Actually Cost?" — deviation from the main-clause convention ("Beyond Categories" alone is too vague to search); the question is the searchable phrase
- **Article key:** `spendingTags` · **datePublished:** 2026-08-28
- **Journey stage:** `monthToMonth`, last position (after catch-overspending-early)
- **Index icon:** `Tag` (lucide)
- **Related links:** `<link>` → ai-financial-coach (Zero does the math), `<link2>` → saving-while-paying-off-debt (the Vacation-tag-plus-goal prompt ties directly)

## Ground truth (verified in shipped code/PRD/seeds)

| Claim | Source |
|---|---|
| Tags are household-scoped labels that "cut across categories, so you can track things like a vacation or a project wherever the spending happens" | `tour.tags.purpose` — quoted verbatim, localized copy exists in fr/es |
| PRD frames tags exactly this way: "cross-cutting groupings like 'Vacation'… for filtering and reporting"; Implemented | PRD-TZ-43 |
| Create: name ≤ 50 chars, **case-sensitive** ("vacation" ≠ "Vacation"), optional color from 12 presets, alphabetical list | `tour.tags.createButton`, PRD-TZ-43, `tags.dialog.createTag` |
| RBAC: Viewers see, Editors create/edit, only Admins delete | PRD-TZ-43 + `TagCard.tsx` role checks |
| Tag in the moment: multi-select "Select tags" on a transaction, "+ Create new tag" inline without leaving the form | `transactions.fields.tagsPlaceholder`, `transactions.tagInlineCreate` |
| Split lines carry their own "Tag (optional)" — partial-vacation receipts | `transactions.dialog.split.tag` |
| Filter the transaction list by tag ("Any tag") | `transactions.filters.tags` |
| **Totals come from Zero**, whose seeded TAGS prompt category (10 prompts) includes: total by tag this year (Medical), tagged-transaction lists (Reimbursable, Tax Deductible), month-vs-month comparison by tag (Date Night), Business/Personal breakdown, per-tag usage counts, tagging-strategy advice, and the Vacation-tag-vs-goal question | `tether-core` changelog 075-seed-ai-prompt-library.yaml, TAGS category |
| **Honesty guardrails:** no built-in tag-total report in the transactions UI, and the Tags page's per-tag transaction count is a placeholder (`tour.tags.list`: "doesn't yet reflect real transaction usage") — the article attributes browsing to the filter and math to Zero, and never claims an in-app tag report or live counts | verified absence + tour copy |

fr/es quote the app's localized terms: « étiquettes » / «etiquetas», « Toutes les étiquettes » / «Cualquier etiqueta», « + Créer une nouvelle étiquette » / «+ Crear nueva etiqueta», etc.

## Skeleton (intro + 6 sections × 2 ¶ + CTA; template = GoalsAndDebtArticlePage)

1. **intro** — The vacation was one decision, but the budget scattered it across five categories: groceries, gas, restaurants, lodging, that airport coffee. Categories answer "where does money go each month?" — they cannot answer "what did this one adventure cost?"
2. **whyCategoriesFail** (Layers) — categories are the budget's load-bearing walls (monthly, exclusive, one per transaction); events/projects are cross-cutting. Renaming categories to fit events breaks the budget; the answer is a second, orthogonal axis.
3. **meetTags** (TagIcon) — the Tags page: household labels with optional colors; tour-purpose quote; ≤ 50 chars; the case-sensitivity gotcha as a practical tip; who can do what (Editors manage, Admins delete, everyone sees).
4. **tagAsYouGo** (Zap) — tagging at entry: multi-select on any transaction, several tags at once, and "+ Create new tag" inline mid-entry; tag the trip while standing in line, not during a month-end archaeology dig.
5. **splitTheReceipt** (SplitIcon) — the Costco run that was half vacation cooler, half normal groceries: split the transaction, give each line its own tag; the vacation total stays honest without inventing fake transactions.
6. **askZeroForTheBill** (MessageCircle) — browsing vs. arithmetic: filter the list by tag to see every vacation transaction; ask <link>Zero</link> for the math — quote seeded prompts ("What's my total spending across all transactions tagged as Medical this year so far?", Date Night month comparison). Your vacation question is the same sentence with your tag in it.
7. **oneLabelManyJobs** (Briefcase) — the same mechanism does expense reports (Reimbursable), tax season (Tax Deductible), remodels (Home Renovation), and date nights; Zero even helps design a tagging strategy; and the seeded Vacation-tag-vs-<link2>vacation-goal</link2> prompt closes the loop: tags measure the past, goals fund the future.
8. **cta** — "Tag the trip. Get the number." / start your 30-day free trial.

(Component carries 6 SECTIONS; `whyCategoriesFail` through `oneLabelManyJobs` are the six.)

## Files (established recipe)

1. `site.ts` — `ARTICLES.spendingTags` + append to `LEARN_JOURNEY` `monthToMonth` stage
2. `messages/{en,fr,es}.json` — `Learn.articles.spendingTags` + `Articles.spendingTags` (anchored splice after the current last key — **connectYourBank if the peer's splice lands first, else aiFinancialCoach**; script re-reads and anchors on whichever is last at run time)
3. `SpendingTagsArticlePage.tsx` (copy GoalsAndDebtArticlePage; wire link/link2)
4. Two thin routes under `(en)/learn/track-spending-with-tags/` + `[locale]/…`
5. `sitemap.ts` — 3 entries · 6. `LearnIndexPage.tsx` — `ICONS.spendingTags: Tag`

## Verification & commit

Build + swallowed-tag grep + journey-guard tests + index DOM order (13/14 keys depending on peer) + ICU lint (no braces, fr ’, quote conventions). Concurrency: peer session is mid-flight on connect-your-bank in the same shared files — all edits anchored, never whole-file rewrites; expect the build to also include their article if their keys land first. Commit: `feat(learn): add /learn/track-spending-with-tags article on tags`, path-scoped.
