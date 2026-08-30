# Meta Prompt: Tether Zero KB Help-Center Article from a /learn Article

**How to use this prompt:** Fill in the `ARTICLE PARAMETERS` block below for
one `/learn` article, then paste the whole file into a new Claude Code
session whose **working directory is `tether-core`**, with `tether-web` and
`tz-web-site` added as additional working directories (`/add-dir`). The
session reads the Learn article and the app's source of truth, writes only
under `tether-core/kb-content/**`, and touches `tether-web` only if a
screenshot capture is added. **One run = one Learn article = at most one new
KB article, one improved existing article, or a skip recommendation.** Do
not batch several Learn articles into one run.

---

## ARTICLE PARAMETERS (fill in before each run)

```yaml
learn_article_key: "" # ARTICLES key in tz-web-site/src/content/site.ts, e.g. spendingTags
disposition: "auto" # auto | write | complement | improve | skip — override only if already known
target_category: "" # blank = decide in Phase 0/2; if set, must be one of the 9 enum values
screenshots: "auto" # auto | none | N (max images; auto = 1–2 if a stable state is seedable)
locales: "en+fr+es" # en+fr+es (default) | en — en-only needs a stated reason in Phase 2
```

If `learn_article_key` is blank when this prompt is run, stop and ask for it
in Phase 2 rather than guessing. Every other blank or `auto` field is
resolved from Phase 0 evidence plus Phase 2 answers — never by guessing. If
`disposition` is set, Phase 0 still runs its scan and must state whether the
evidence agrees; disagreement becomes Phase 2 Q1, it is never silently obeyed.

---

## Project Context

Two audiences, two genres. The marketing site's `/learn` articles
(`tz-web-site`) are public, top-of-funnel narrative pieces: they explain the
*why* and persuade. The in-app **Help Center Knowledge Base** (`tether-core/
kb-content/`) is behind auth, read in a 600 px side panel, and serves two
readers at once — a signed-in user looking for a how-to, and the AI support
chat, which answers **only** from KB excerpts it retrieves. A KB article is
imperative reference, not prose.

**Rewrite the *job*, not the *prose*.** The Learn article tells you which
shipped feature and which user question to cover. Nothing from its
narrative, invented example numbers, persuasion, or CTA carries over.

**Corpus today:** 38 English articles across 9 categories; `fr`/`es`
translations exist only for GETTING_STARTED plus one article each
elsewhere; the app shows an English-fallback badge when a translation is
missing. Ten screenshots are already live, captured through the Playwright
pipeline described in Phase 4.

**The authoring contract lives in tether-core — read these before Phase 0:**
`kb-content/README.md` (format, images, workflow), `kb-content/
EDITORIAL-CHECKLIST.md` (structural gates + per-category human sign-off),
`docs/prd/PRD-Feedback-Help-Center.md` §FR-4 (schema, category enum,
KB-origin-only images), `docs/prd/PRD-KB-CONTENT-LAUNCH.md`, and `docs/prd/
kb-screenshot-support-audit.md` (end-to-end image path — note its "480 px
panel" figure is stale; the panel is 600 px, see `tether-web/src/features/
help-center/components/HelpCenterPanel.tsx`).

**Retrieval facts that shape every writing rule below** (`scripts/kb/
chunker.mjs`, `src/main/resources/application.properties` `app.ai.support.*`):
article bodies are chunked **heading-aware** at ~500 tokens, each chunk
prefixed with its heading path (`Title > ## Heading`); the chat retrieves the
top 6 chunks above a 0.25 cosine threshold with at most 3 chunks per article;
the frontmatter `summary` is **not** embedded; image references are embedded
as `alt — caption` with the URL stripped. Headings are retrieval boundaries.
Alt text is retrieval signal.

---

## Pre-audited Learn → KB disposition map (hypothesis — re-verify in Phase 0)

Audited 2026-08-30 against the 38 published `en` articles. The corpus
changes; Phase 0 must re-derive the disposition from the live tree and say
whether it agrees with this row.

| Learn key | Learn title (short) | Hypothesis | Proposed category | Nearest existing KB slugs | Complementary angle (if any) |
|---|---|---|---|---|---|
| `budgetJourney` | The Budget Journey (reading map) | DUP | — | welcome-to-tether-zero, complete-getting-started-guide | Marketing-only navigational artifact; no KB article |
| `makingABudget` | How to Make a Budget… with Your AI Coach | DUP (budget half) / GAP (coach half) | GETTING_STARTED | what-is-zero-based-budgeting, set-up-a-budget, complete-getting-started-guide | "Asking Zero for help building your budget" |
| `connectYourBank` | Get Your Money Into Tether-Zero | ADJ | ACCOUNTS_TRANSACTIONS | connecting-your-bank-with-plaid, connect-your-first-account, reviewing-imported-transactions | File import (CSV/OFX) and auto-categorization |
| `budgetWithPartner` | Budgeting Is a Team Sport | DUP | HOUSEHOLD_SHARING | invite-a-partner, roles-and-permissions, create-your-household | — |
| `firstBudget` | Your First Budget in 10 Minutes | DUP | GETTING_STARTED | setting-up-your-first-budget, set-up-a-budget | Confirm the KB's wizard naming matches the shipped wizard (accuracy fix, not a new article) |
| `envelopeBudgeting` | Give Every Dollar a Job | DUP | BUDGETING | what-is-zero-based-budgeting, budget-categories-explained, understanding-ready-to-assign, month-rollover | — |
| `sinkingFunds` | Sinking Funds Explained | DUP | BUDGETING | sinking-funds | — |
| `catchOverspendingEarly` | Catch Overspending Before It Happens | ADJ | BUDGETING | handle-overspending, overspent-category (both reactive) | Reading the Spending Pace gauge and pacing alerts (proactive) |
| `spendingTags` | Beyond Categories: Tags | GAP | ACCOUNTS_TRANSACTIONS | (one clause in complete-getting-started-guide); split-a-transaction is adjacent | Track a theme across categories with tags |
| `irregularPaycheck` | Budgeting on an Irregular Paycheck | GAP | BUDGETING | — | Pay cadence and holding categories |
| `payOffDebtFaster` | Snowball vs. Avalanche + Simulation | ADJ | DEBT_PAYOFF | avalanche-vs-snowball, getting-started-with-debt-crusher, debt-crusher-overview | The Strategy Simulator screen itself |
| `snowflakePayments` | The Power of Snowflake Payments | GAP (one-line tip only) | DEBT_PAYOFF | getting-started-with-debt-crusher (tip) | Make a snowflake payment |
| `windfallInterceptor` | What to Do With a Windfall | GAP | DEBT_PAYOFF | — | The Windfall Interceptor card: accept / not now |
| `canIAffordThis` | What Does That Purchase Really Cost? | GAP | DEBT_PAYOFF | — | Ask Zero "can I afford this?" — the Opportunity Cost card |
| `goalsAndDebt` | Saving for a Dream While Killing Your Debt | ADJ | GOALS | saving-for-multiple-goals, building-your-emergency-fund | The Debt Crusher conflict warning when creating a goal |
| `moneyStory` | Reading Your Money Story | ADJ | BUDGETING (no INSIGHTS category exists) | age-of-money | Insights: net worth and income vs. expense cards |
| `aiFinancialCoach` | Meet Zero, Your AI Money Coach | GAP | GETTING_STARTED | (none; contact-support mentions "AI assistant" in passing) | What Zero can answer and what data it sees |

**Known internal KB duplicates — flag in the PR, never fix in this run:**
`BUDGETING/handle-overspending` ≈ `BUDGETING/overspent-category`;
`BUDGETING/reconciling-your-account` ≈ `ACCOUNTS_TRANSACTIONS/reconcile-an-account`.

---

## Hard Constraints (apply to every phase)

1. **Shipped behavior only.** Every UI label is quoted verbatim from
   `tether-web/src/lib/i18n/locales/en.json` (`fr.json` / `es.json` for those
   locales). Every flow step traces to a component under `tether-web/src/
   features/**`, a PRD in `tether-web/docs/prd/` that is implemented, or a
   tour string. No invented buttons, screens, numbers, or limits. A Learn
   claim that cannot be re-verified in code does **not** enter the KB.
2. **No fake screenshots.** An image is either captured from the running app
   through the Playwright spec in this run, or it does not exist. Never mock,
   draw, edit pixels, or reuse an image that shows a different state than the
   adjacent text describes.
3. **Category is enum-only.** The nine values in `tether-core/scripts/kb/
   constants.mjs` are the whole universe; adding one is a separate approved
   change (see Category rules) and out of scope for a run.
4. **One artifact per run.** One new article, or one edited existing article,
   or a skip recommendation. Never also "tidy" neighboring articles. Internal
   KB duplicates are flagged, not fixed.
5. **Write scope.** `tether-core/kb-content/**`, `tether-core/.agents/plans/
   kb-<slug>.md`, and — only when a capture is added — `tether-web/tests/e2e/
   capture-screenshots.spec.ts` and `tether-web/docs/guides/images/kb/**`.
   `tz-web-site` is read-only in this prompt.
6. **`en` is canonical.** `fr`/`es` files share the English `category` and
   `slug`, localize only `title`/`summary`/`tags`/body, and reference
   `/en/<CATEGORY>/img/...` assets.
7. **Local only.** The dev endpoints (`/api/v1/dev/*`) and any `psql` run only
   against `localhost`. Never against a non-local database. `ZERO_DB_PASSWORD`
   stays in the environment and is never written to a file or commit.
8. **Branches and commits.** Never commit to `master`. tether-core: branch
   `kb/<slug>`, commit messages in the repo's existing style —
   `kb: <imperative>` (e.g. `kb: add spending tags article`, `kb: revise
   sinking-funds — retake toggle screenshot`). tether-web (only if touched):
   branch `feature/kb-screenshots-<slug>`, Conventional Commits
   (`test(e2e): capture <slug> KB screenshots`).
9. **Plan file** at `tether-core/.agents/plans/kb-<slug>.md` (the directory
   already exists).
10. **Never edit `validate.mjs`, `constants.mjs`, or `.github/workflows/
    kb-deploy.yml`** to make an article pass.

---

## Phase 0 — Read-Only Discovery (no writes)

Report each item as path + one-line finding.

1. Resolve `learn_article_key` in `tz-web-site/src/content/site.ts`
   (`ARTICLES` entry, and its stage/position in `LEARN_JOURNEY`); read its
   `*ArticlePage.tsx` and message namespace (`messages/en.json` →
   `Articles.<key>`); read `tz-web-site/.agents/plans/learn-*.md` for this
   article if it exists — its "Ground truth" table is a **claim inventory to
   re-verify**, not proof.
2. Extract the **feature inventory**: every feature, screen, UI label, limit,
   threshold, and role rule the Learn article mentions. This inventory — not
   the article's narrative — is the input to everything that follows.
3. Re-verify every inventory item in `tether-web` (i18n keys, components,
   `data-tour` strings, PRDs) and `tether-core` where the rule is
   server-side. Mark each **VERIFIED / NOT FOUND / PRD-ONLY** with its source.
4. **KB scan** (the disposition evidence), read-only, in
   `tether-core/kb-content/en/`:
   - List every category with titles and summaries:
     `grep -h '^title:\|^summary:' kb-content/en/*/*.md` (per directory).
   - Body-grep every inventory item's key terms **and their synonyms** (the
     UI name, the plain-English name, the Learn article's name for it); list
     hits by slug with the heading they fall under. **Grep the body only** —
     strip the frontmatter first (everything up to the second `---`), because
     every article has a `tags:` key and terms like "tag", "order", or
     "summary" false-positive on all 40 files otherwise.
   - Read every article with at least one hit end to end.
   - Read `scripts/kb/golden-questions.json` and note any golden question
     whose expected article overlaps this topic.
5. Produce the **Disposition Verdict** using the rules below, with its
   evidence table.
6. List at most two category candidates with reasons (Category rules below).
7. **Screenshot feasibility**, per candidate image: route, `data-tour` anchor
   (`tether-web/src/features/tour/registry/*.tour.ts`; 96 exist) or a
   role/text locator when none does, the exact data state required, and
   whether that state is seedable **API-live** (as the existing capture spec
   does), needs **SQL**, or is **not reproducible locally**. Known anchor
   gaps: there is no `data-tour` for the Spending Pace gauge, the Windfall
   Interceptor card, the Opportunity Cost card, or the net-worth card (only
   `insights.cardGrid`) — plan the `locator("div, section").filter({ has:
   … })` composition the existing spec already uses. Known seed caveat:
   `tether-core/scripts/seed-*.sql` hardcode foreign household/account ids
   and months — they are patterns to adapt, never run as-is against the
   persona. Confirm prerequisites are *available* without starting anything:
   backend on `:8080`, frontend on `:3000`, `ZERO_DB_PASSWORD` if SQL is
   needed.
8. Locale state: which sibling articles in the candidate category already
   have `fr`/`es` files.
9. Output a concise **"Phase 0 Findings"** block and stop.

### Disposition rules (decided in Phase 0, gated in Phase 3)

- **DUP → `skip`** when an existing *published* `en` article already answers
  the Learn article's core user question with the same steps on the same
  screen. Evidence: a table `inventory item | existing slug | heading that
  covers it`. A DUP with a concrete defect — stale UI label, missing step,
  missing or outdated screenshot, label-style headings — becomes
  **`improve`**.
- **ADJ → `complement`** when one or more articles cover part of the
  inventory but a distinct, non-trivial user question (a different screen,
  feature, or decision) is uncovered. The plan must name the complementary
  angle in one sentence and list the existing slugs the new article will
  cross-link **instead of re-explaining**.
- **GAP → `write`** when the body grep returns zero hits or only passing
  mentions. Evidence: the grep output.

---

## Category rules

1. Category = **where the user is standing when they need the answer** —
   the app route the steps begin on.
2. `GETTING_STARTED` only for first-week, whole-product orientation.
   `TROUBLESHOOTING` only for "something is wrong". `SUBSCRIPTION_BILLING`,
   `SECURITY_PRIVACY`, `HOUSEHOLD_SHARING` are literal.
3. Two plausible categories: prefer the one containing the article this one
   will cross-link most (browse and retrieval both benefit from adjacency);
   tiebreak with the pre-audited map; if still tied, ask in Phase 2.
4. Concepts with no home go to the category of the **next action the user
   takes**: Insights → `BUDGETING`; Zero-as-onboarding → `GETTING_STARTED`.
   Do not propose a new enum value just because a feature name has no
   category.
5. A new enum value is justified only when ≥ 3 planned articles would land in
   it and none fits an existing value. It touches `scripts/kb/constants.mjs`
   `CATEGORIES`, `kb-content/README.md`, the `EDITORIAL-CHECKLIST.md` sign-off
   table, `docs/prd/PRD-Feedback-Help-Center.md` FR-4.2, `tether-web/src/
   features/help-center/types/helpCenter.types.ts`, `helpCenter.kb.
   category.<VALUE>` in all three `tether-web/src/lib/i18n/locales/*.json`,
   and `scripts/kb/golden-questions.json` — plus a tether-web deploy. The
   plan may *recommend* it under follow-ups and must then place the article
   in the best existing category.

---

## Phase 1 — Todo List

Produce a numbered list (12–20 items) covering, at minimum: disposition
evidence; category decision; slug/title/summary/tags draft; retrieval-shaped
outline; claim → source table; cross-link list (and what each link
*replaces*); screenshot plan or an explicit "no screenshot" line; capture-spec
extension; capture run; hand-off (rename/crop/copy); alt + caption authoring;
fr/es files; `validate.mjs` + `node --test`; golden dry-run; manual link-target
check; title/summary collision check; EDITORIAL-CHECKLIST row; commit and PR;
cold-read self-review.

---

## Phase 2 — Clarifying Questions (one at a time, single-letter defaults)

Ask only what Phase 0 left open, one question at a time, waiting for the
answer before the next. Each has a recommended default.

- **Q1 Disposition** (only if the verdict is `skip`/`improve`, or the
  `disposition` parameter disagrees with the evidence): (A) accept the Phase 0
  verdict **[default]**, (B) override to `write` with a written justification.
- **Q2 Category** (only if two candidates survived): (A) `<primary>`
  **[default]**, (B) `<secondary>`.
- **Q3 Screenshots:** (A) 1–2 element-scoped shots of the seedable states
  listed in Phase 0 **[default]**, (B) none this run, (C) the full Phase 0
  list. If a needed state is not reproducible, say so here and shrink (A)
  accordingly.
- **Q4 Seeding method** (only if a state needs database-level changes):
  (A) API-live inside the spec **[default when possible]**, (B) a
  parameterized SQL step via the spec's existing `docker run … psql` pattern,
  scoped by household/account ids fetched at runtime, (C) skip that image and
  describe the state in text.
- **Q5 Golden question:** (A) leave `scripts/kb/golden-questions.json`
  untouched **[default]**, (B) add one question for a GAP article — this
  changes the live smoke contract, so it needs explicit approval.
- **Q6 Locales** (only if the parameter is not the default): confirm the
  stated reason for `en`-only. Default is `en+fr+es`.
- **Q7 Order:** (A) append after the highest `order` in the category
  **[default]**, (B) a specific position.

---

## Phase 3 — Dry-Run Plan (approval gate)

Write the full plan to `tether-core/.agents/plans/kb-<slug>.md` and echo it
in chat. It must contain:

1. **Disposition verdict + evidence table.** For `skip`: present a *skip
   recommendation* instead of an outline — the evidence, the existing slug(s)
   users should be pointed to, and at most three bullets of improvements
   worth a separate run; end with "Reply **approve** to end this run with no
   content writes, **improve** to switch to an improvement plan, or
   **write** to override with a written justification." For `improve`: a
   diff-style plan against the existing file — headings to add or rewrite,
   labels to correct, screenshots to add or retake, `updated` bumped;
   `slug` and `category` never change (renames break `/kb/` links and golden
   questions).
2. **Frontmatter exactly as it will be written:** `title` ≤ 120, `slug` =
   filename, `category` = directory, `summary` ≤ 200, `tags` ≤ 10 lowercase,
   `order`, `updated` = today (ISO), `published: true`.
3. **Collision table:** proposed title/summary/tags against every existing
   title and summary in the category (and any body-grep hit elsewhere), with
   a one-line "distinct because…" per near-match. Rule: the new title contains
   no existing title as a substring; the summary shares fewer than about half
   its content words with any existing summary in the category. Confirm no
   golden question would now retrieve this article ahead of its expected one.
4. **Outline:** the H1 plus each `##` heading (question- or task-shaped, see
   Retrieval rules), the one idea it holds, target length (≤ ~120 words), the
   claims it makes with sources (`file:line` or i18n key), and — for every
   concept the section deliberately does *not* explain — the `/kb/<slug>`
   link that replaces the explanation.
5. **Screenshot table:** `filename | route | anchor or locator | required
   state | seeding (API / SQL / none) | alt draft | caption draft | placed
   after step #`. "No screenshot: state not reproducible locally" is a valid
   row.
6. Files to create or modify, per repo, one sentence each.
7. Locale plan (`en` + `fr` + `es` files, or the approved `en`-only reason).
8. Rollback note: delete the new file(s); for `improve`, `git revert` the
   single commit.

**Do not write any file under `kb-content` or `tests/e2e` until this plan is
explicitly approved.** End with: "Reply **approve** to proceed, or list
changes."

---

## Phase 4 — Phased Implementation

Execute in order. After each step run its gate and report pass/fail before
moving on. Stop and ask if a gate fails and the fix is not obvious.

**4.1 Environment check (no writes).** `curl -s localhost:8080/actuator/
health`, `curl -s -o /dev/null -w '%{http_code}' localhost:3000`, and
`ZERO_DB_PASSWORD` present if SQL seeding was chosen. Gate: everything
reachable — otherwise screenshots drop to "text only" and the plan is amended
in chat before continuing.

**4.2 Capture spec** (skip if no screenshots). Extend
`tether-web/tests/e2e/capture-screenshots.spec.ts` with a second
`test.describe("KB screenshots — <slug>", …)` block that reuses the file's
existing helpers and conventions: the `RUN` guard (`CAPTURE_SCREENSHOTS=1`),
`test.describe.configure({ mode: "serial" })`, viewport 1280 × 832,
`cleanChrome(page)`, `suppressTours(page, uid)`, the `lara-light-blue` theme,
the `USER` persona ("Rivera Demo", household "The Rivera Family") recreated
via `recreateTestUser`, `devToken` / `api()` helpers, `MONTH = "2026-08"`,
and its own `OUT = "docs/guides/images/kb/<slug>"`. Seed realistic data
API-live with the spec's naming style ("Chase Checking", "Trader Joe's",
"Acme Corp Payroll"). For database-only states, mirror the spec's existing
`docker run … psql` step with a parameterized `UPDATE`/`INSERT` scoped by ids
fetched at runtime — never paste ids from `scripts/seed-*.sql`. Locate with
`page.locator('[data-tour="…"]')` first, composed `locator("div, section").
filter({ has: … })` on real i18n text second, and role locators for the Help
Center panel (it has no `data-tour`). Use element-scoped
`locator.screenshot({ path })`; `page.screenshot()` only as the documented
fallback. Run:

```
CAPTURE_SCREENSHOTS=1 npx playwright test tests/e2e/capture-screenshots.spec.ts --project=chromium --grep "KB screenshots"
```

Gate: the KB block passes; the existing "Getting Started Guide screenshots"
block still passes when run; `npx tsc --noEmit` is clean; run
`git checkout -- next-env.d.ts` before staging (per tether-web `CLAUDE.md`).

**4.3 Hand-off.** Rename each capture to a descriptive kebab name
(`spending-pace-gauge.png`, never `01-….png`), crop tightly (element-scoped
shots usually need none), keep width ≤ ~900 px (`sips -g pixelWidth <file>`)
and size ≤ 1 MiB (`stat -f %z <file>`), and copy into
`tether-core/kb-content/en/<CATEGORY>/img/`. Gate: every file is within
limits and shows exactly the state its adjacent step describes; the only
person-like data visible is the synthetic persona.

**4.4 Write the article** at `kb-content/en/<CATEGORY>/<slug>.md`:
frontmatter; `# Title` equal to `title`; three to six `##` sections;
second-person imperative numbered steps; UI labels in **bold**, verbatim;
`> **Tip:**` for asides; about 250 words (≥ 200 characters); each image on
its own line **directly after the step it illustrates**, with alt and
caption per the Screenshot authoring rules; a `[text](/kb/<slug>)` link to
every existing article whose content this one deliberately does not repeat.
Gate: with every image line removed (`grep -v '^!\[' <file>`), the steps
still read as complete, unambiguous instructions.

**4.5 fr / es.** Same `category` and `slug`; localized `title`, `summary`,
`tags`, body; UI labels quoted from `tether-web/src/lib/i18n/locales/
{fr,es}.json`, not translated from English; image references point to
`/en/<CATEGORY>/img/...`. Gate: `validate.mjs` green for all locales.

**4.6 Validation.**

```
cd tether-core/scripts/kb && npm ci && npm run validate && npm test && node golden-questions.mjs --dry-run ../../kb-content
```

Gate: all green.

**4.7 Manual link-target check** (CI does not validate `/kb/` links). For
every `](/kb/<slug>)` in the new or edited files,
`ls kb-content/en/*/<slug>.md` resolves to exactly one published file. Gate:
zero unresolved links; list the checked slugs in the commit body.

**4.8 Editorial.** Add or update the category's row in
`kb-content/EDITORIAL-CHECKLIST.md` with reviewer "pending human sign-off",
and list in the PR exactly what the human must verify against the live UI —
each screenshot included. The agent never marks a category accurate.

**4.9 Commit and PR.** Per Hard Constraint 8. The PR body states the
disposition and its evidence, the category rationale, the cross-links, the
screenshots (with the human sign-off items), the flagged internal
duplicates, and follow-ups (reverse "See also" links in sibling articles,
any recommended enum addition). Gate: the `KB deploy / validate` job is green
on the tether-core PR.

---

## Screenshot authoring rules (referenced by 4.3 and 4.4)

- **Alt text** = what is on screen, named the way the UI names it, including
  the state. Eight to twenty-five words. Example: *Budget page Groceries row
  with the Spending Pace gauge in the amber zone and a projected-overspend
  notice*. Never "screenshot of", never "image".
- **Caption** (the optional `"title"` part of `![alt](url "title")`) = why it
  matters or what to look at; a sentence fragment, never a filename.
  Example: *The gauge turns amber before the category is actually overspent*.
- Together, alt and caption are **everything the AI sees of an image** —
  write them so a support answer could quote them.
- At most one image per section, always after the step it illustrates, never
  in the introduction, never the sole carrier of a step.
- Paths are root-absolute `/{locale}/{CATEGORY}/img/{kebab}.{png|jpg|jpeg|
  webp}`; unreferenced assets fail CI, so every file copied in must be used.
- A state that cannot be reproduced locally (needs live Plaid data, a
  time-based trigger, or a production-only path) gets text only, with the
  plan noting "no screenshot: state not reproducible locally". Never
  substitute a related-but-different state.

---

## Non-duplication mechanics

- For every inventory item an existing article already explains, this
  article gets **one sentence and a link — never the steps again**. The
  mapping (concept → linked slug) is shown in the Phase 3 outline.
- When the disposition is `complement`, the reverse link (a "See also" line
  in the sibling article) is a **follow-up listed in the PR**, not an edit in
  this run (Hard Constraint 4).
- The collision rule in Phase 3 item 3 is re-checked in Phase 5 against the
  live tree.

---

## Retrieval-tuning rules

- The H1 equals `title`. Every `##` heading is a question a user would type
  ("How do I see my net worth?") or a task ("Import a CSV file") — never a
  bare label such as "Overview" or "Details".
- One idea per section. A section must make sense read alone with only
  `Title > Heading` as context: restate the feature name in its first
  sentence; never write "as above" or "see the previous section".
- Keep each section under ~500 tokens so that section = chunk; three to six
  sections so the article's best chunks all fit within the three-per-article
  retrieval cap.
- `summary` is not embedded: its key terms must also appear in the body's
  first paragraph.
- `tags` are lowercase, phrased in the user's words, and include synonyms
  the UI does not use ("pacing", "overspending alert", "spending pace").
- No marketing phrasing in headings ("Stop getting ambushed…") — it is off
  the distribution of real support questions.

---

## Phase 5 — Cold-Read Self-Review

Perform this as if you had **not** written the article. Do not validate
against your own Phase 3 plan; re-derive expectations from the
`ARTICLE PARAMETERS`, the KB authoring contract, and the live corpus, then
check the repository state against them. Answer each item with
**PASS / FAIL / N/A** and a one-line justification:

1. The disposition verdict is still supported: a fresh grep of the corpus for
   the article's core terms returns no article that answers the same
   question the same way.
2. The category equals the directory, is in the enum, and is where the steps
   begin in the app.
3. Frontmatter passes `validate.mjs`; `slug` == filename; `updated` is today;
   `published: true`.
4. The body opens with an H1 equal to `title`; every other heading is `##`
   and question- or task-shaped; none is a bare label.
5. Every bold UI label matches a string in the `en` locale file exactly
   (and the `fr`/`es` files for those locales).
6. Every factual claim traces to a Phase 0 source; anything PRD-only or
   NOT FOUND is absent, not softened.
7. With every image line deleted, the steps are still complete and
   unambiguous.
8. Each screenshot was captured from the running app in this run, shows
   exactly the state its adjacent step describes, is ≤ 1 MiB and ≤ ~900 px
   wide, and its alt and caption describe what is on screen using the UI's
   own names.
9. Every `/kb/<slug>` link resolves to a published `en` file, and every
   existing article that explains a referenced concept is linked rather than
   re-explained.
10. Title and summary collide with no existing title or summary; the golden
    dry-run passes and no golden question is now better answered by this
    article than by its expected one.
11. Each section is ≤ ~500 tokens and self-contained; the summary's key terms
    appear in the body.
12. Nothing from the Learn article's narrative, example numbers, persuasion,
    or CTA leaked in; the tone is second-person imperative reference.
13. `fr`/`es` files share category and slug with `en`, quote localized UI
    strings, and reference `/en/` images (or the approved `en`-only reason is
    recorded).
14. Writes are confined to the allowed paths; no unrelated article changed;
    the known internal duplicates are flagged in the PR, not edited.
15. `npm run validate`, `npm test`, the golden dry-run — and the capture spec
    plus `npx tsc --noEmit` in tether-web, if touched — all pass; branches
    and commits follow the conventions; the plan file exists at
    `.agents/plans/kb-<slug>.md`; the EDITORIAL-CHECKLIST row names what the
    human must verify.

If any item is FAIL, fix it and re-run the checklist from the top before
declaring the work complete. Finish with a short summary: the disposition,
the file path(s), the screenshots captured, and the follow-ups (sibling
"See also" links, internal duplicates, any recommended enum addition).
