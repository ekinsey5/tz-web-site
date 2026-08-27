# Meta Prompt: Tether Zero Onboarding Blog Article (Marketing Site)

**How to use this prompt:** Fill in the `TOPIC PARAMETERS` block below for each
article you want, then paste the whole file into a new Claude Code session in
the **marketing site repo**. The agent picks the topic from your inputs — do
not hardcode a topic into this template.

---

## TOPIC PARAMETERS (fill in before each run)

```yaml
topic: "" # e.g. "Getting started with zero-based budgeting" / "How to use AI Coach Zero" / "Debt Crusher walkthrough"
primary_feature_area: "" # e.g. Category Groups, AI Coach Zero, Debt Crusher, Plaid sync, Goals
target_reader: "new signup, pre- or just-post-onboarding" # override if different
primary_keyword: "" # main SEO phrase to target
secondary_keywords: [] # 2-5 supporting phrases
word_count_target: "900-1300"
cta_goal: "" # e.g. "start free trial", "invite a partner", "connect a bank account"
slug: "" # e.g. /blog/zero-based-budgeting-basics
```

If any field above is blank when this prompt is run, stop and ask me for it
in Phase 2 rather than guessing.

---

## Project Context

You are writing marketing content for **Tether Zero**, a zero-based budgeting
and debt-payoff SaaS competing with YNAB and EveryDollar. This article will
live on the **marketing site** (Next.js App Router, separate repo from the
app itself) and is aimed at helping a new or prospective user understand and
adopt a specific product feature.

The article must describe **real, shipped or in-PRD Tether Zero behavior
only** — never invented features, screenshots, numbers, or UI copy. Ground
every product claim in the actual codebase/PRDs, not general budgeting-app
knowledge.

---

## Phase 0 — Read-Only Discovery (no writes)

1. Scan the marketing site repo for existing blog infrastructure: content
   directory (MDX/CMS?), blog `page.tsx`/route structure, existing article
   front-matter schema, SEO metadata patterns, and any shared layout/TOC
   components (reuse, don't rebuild — check how legal pages and any existing
   articles set `metadata`, Open Graph tags, and JSON-LD).
2. Search the **app repo / PRDs / KB articles** for the ground-truth
   description of `primary_feature_area` — exact terminology, flow steps,
   screen names, and any constraints (e.g., RBAC role names, persona names
   for AI Coach Zero, exact Debt Crusher strategy names). Do not proceed to
   writing until you can cite where each factual claim in the article comes
   from.
3. Check whether a KB article already exists on this topic
   (`docs/kb/**` or equivalent) — if so, the blog post should complement it
   (top-of-funnel, narrative, benefit-driven) rather than duplicate it
   (how-to reference), and should link to it.
4. Note the brand color guard: primary is `#155DFC`. Reject `#0D9488` and
   `#2563EB` if they appear in any component you touch.
5. Report findings before proceeding to Phase 1.

## Phase 1 — Todo List

Produce a numbered list (12-20 items) covering: content outline, fact
sourcing/citations to internal docs, front-matter/SEO fields, any new
route/MDX file, image/alt-text placeholders, internal links (to app
signup, related KB articles, related blog posts), analytics event(s) if the
site tracks blog engagement, and a self-review pass.

## Phase 2 — Clarifying Questions (one at a time, single-letter defaults)

Ask only what's still unresolved after Phase 0, one question at a time, each
with a recommended default, e.g.:

- Tone: (A) warm/encouraging **[default]**, (B) direct/no-nonsense, (C)
  data-driven
- Article format: (A) narrative walkthrough **[default]**, (B) numbered
  step-by-step, (C) FAQ-style
- Hero image: (A) placeholder + alt text only **[default]**, (B) I'll
  provide an image, (C) skip
- CTA placement: (A) end of article only **[default]**, (B) end + mid-article
  callout

## Phase 3 — Dry-Run Plan

Present, for approval before any writes:

- Full outline (H2/H3 structure) with the one or two factual claims each
  section will make and their source
- Draft front-matter block (title, meta description ≤160 chars, slug,
  primary/secondary keywords, OG title/description, publish date placeholder)
- Where the file will live and what it will touch (new file only, ideally —
  flag if any shared component needs edits)

Do not write the article body until this plan is approved.

## Phase 4 — Phased Implementation

1. Write the article in **prose paragraph form**, plain, benefit-led
   language for someone who has not yet built a habit with the product —
   explain the "why" before the "how." Avoid feature-list dumping.
2. Use the app's actual terminology exactly (feature names, persona names,
   nav labels) — no invented UI text.
3. Naturally reference `primary_feature_area` and work toward `cta_goal`
   without becoming an ad; one clear CTA is enough.
4. Add front-matter/metadata per the site's existing pattern from Phase 0.
5. Alt text on every image placeholder; heading hierarchy must be valid
   (single H1, sequential H2/H3) for WCAG 2.1 AA.
6. If the site fires PostHog blog events, follow existing event conventions:
   snake_case, no PII, no raw currency amounts.
7. English only for this pass — do not scaffold fr/es content or i18n keys.
8. Run the site's normal lint/build/typecheck after adding the route/file.

## Phase 5 — Cold-Read Self-Review

Re-read the finished article as a first-time visitor with no context, and
check independently (don't just re-check your own outline):

- [ ] Every factual/product claim traces to something you actually found in
      Phase 0 — nothing invented
- [ ] No stale brand color (`#0D9488`, `#2563EB`) introduced
- [ ] Reads as genuinely helpful onboarding content, not thin SEO filler
- [ ] Meta description and title fit platform limits and match on-page H1
- [ ] One clear CTA aligned to `cta_goal`; no dead or placeholder links left
      unmarked
- [ ] Heading hierarchy and alt text pass a basic accessibility check
- [ ] Flags anything Phase 0 couldn't confirm (e.g., feature still in PRD,
      not yet shipped) as an open question rather than silently writing
      around it
