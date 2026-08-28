# Plan — /learn article: "Saving for a Dream While Killing Your Debt"

Status: awaiting approval. No article files written yet.

## Front matter (proposed)

```yaml
topic: "Saving for a dream while paying off debt — Financial Goals alongside Debt Crusher"
primary_feature_area: "Financial Goals (+ Debt Crusher integration, Windfall contributions)"
target_reader: "new signup, pre- or just-post-onboarding"
primary_keyword: "save money while paying off debt"
secondary_keywords:
  - "savings goals while in debt"
  - "debt payoff vs saving"
  - "savings goal tracker"
  - "debt free date"
word_count_target: "900-1300"
cta_goal: "start free trial (create your first goal)"
slug: /learn/saving-while-paying-off-debt
```

- **H1/title:** "Saving for a Dream While Killing Your Debt: Goals and Debt Without the Guilt" (user-supplied)
- **meta.title:** "Saving for a Dream While Killing Your Debt" (main-clause convention; buildMetadata appends "· Tether-Zero")
- **Article key:** `goalsAndDebt` — routes at `(en)/learn/saving-while-paying-off-debt/` + `[locale]/…`
- **Format:** narrative walkthrough (template default A); CTA at end only (default A)
- **datePublished:** 2026-08-27

## Ground truth (all verified in shipped code)

| Claim | Source |
|---|---|
| Creating a conflicting goal shows an amber warning: "This goal conflicts with your Debt Crusher plan… Funding this goal will redirect $X/month from your debt payoff. You can still create the goal — we'll update your Debt Crusher projection", with CURRENT vs PROJECTED debt-free date cards and "Slips by N months" | `DebtCrusherConflictWarning.tsx` + `goals.dialog.debtConflict` (real strings in en/fr/es) |
| Milestone celebrations at 25/50/75/100% ("25% Funded!", "Halfway There!"…) | `MilestoneCelebrationOverlay.tsx` + `goals.milestone.*` |
| Goal cover image (Unsplash or upload) + "Goal Image Reveal" insight card showing "{pct}% funded" | `GoalCoverImageSection`, `unsplashApi`, `insights.cards.goalImageReveal`, PRD-TZ-18/73/94 |
| Pacing: "Required per month", "To stay on pace", On track / At risk / Ahead by / Behind by | `goals.detail.*`, `goals.pacing` |
| Budget integration: "Goals this month" strip, "Fund all at suggested pace" (amounts adjusted proportionally for available income), Goal badge on linked categories | `goals.budget.*`, PRD-TZ-85 |
| Contribution sources: monthly allocation, one-time transfer, **windfall**, linked account; contributors tracked per household member; optional note ("e.g. tax refund, birthday money, overtime pay") | `contributeGoalSchema.ts`, `ContributeGoalDialog.tsx`, `goals.contribution.*`, PRD-TZ-76 |
| Pause / Resume a goal; priority reorder; goal journal; retrospective | PRD-TZ-78/80/82, `goals.detail.*` |
| KB complement check: KB has creating-your-first-goal, saving-for-multiple-goals, building-your-emergency-fund — none covers the debt-tension angle; we link sibling /learn articles only | `tether-core/kb-content/en/GOALS/` |

fr/es will quote the app's real localized strings (debtConflict exists in all three; "Debt Crusher" stays untranslated per app copy; goals nav name pulled from `navigation.sidebar.goals` per locale at writing time).

## Article skeleton (intro + 6 sections × 2 paragraphs + CTA, matching the newest template component)

1. **intro** — the guilt: every dollar toward the trip/house/emergency fund feels stolen from debt payoff; all-or-nothing advice fails humans.
2. **falseChoice** — why "debt first, dreams later" backfires (deprivation quits plans); Tether-Zero makes goals first-class citizens next to Debt Crusher instead of a cheat.
3. **honestTradeoff** — the DebtCrusherConflictWarning walkthrough: dollars/month redirected, both dates side by side, "Slips by N months" — and the key sentence: *you can still create the goal*. Information instead of shame = the guilt-free mechanism. (`<link>` → pay-off-debt-faster for the Debt Free Date machinery.)
4. **dreamVisible** — cover image of the actual dream, Goal Image Reveal at N% funded, milestone celebrations at 25/50/75/100.
5. **stayOnPace** — required-per-month pacing, On track/At risk, the budget's "Goals this month" strip and one-tap "Fund all at suggested pace" scaled to available income.
6. **everySource** — contributions from allocations, one-time transfers, **windfalls** (`<link2>` → what-to-do-with-a-windfall), linked accounts; household contributors visible; the note field's own examples are windfall-shaped.
7. **permissionToPause** — Pause/Resume without deleting progress; priorities reorderable; journal + retrospective. Guilt-free includes the tight months.

Wait — template components carry exactly 6 sections; **falseChoice folds into the intro's p2** to keep 6. Final section keys: `falseChoice`(→cut), `honestTradeoff`, `dreamVisible`, `stayOnPace`, `everySource`, `permissionToPause` + one opener section `dreamsAreFuel` (why deprivation-only plans fail). Icons: Target/Scale/Image/Gauge/Coins/Pause (lucide, final pick at write time).

## Files (follows the established recipe exactly)

1. `src/content/site.ts` — `ARTICLES.goalsAndDebt` + add key to `LEARN_JOURNEY` stage `crushDebt`, last position (guard enforces placement).
2. `messages/{en,fr,es}.json` — `Learn.articles.goalsAndDebt` + `Articles.goalsAndDebt` (anchored splice after `aiFinancialCoach`).
3. `src/components/pages/GoalsAndDebtArticlePage.tsx` — copy newest article component; wire `link`/`link2`.
4. Routes: `src/app/(en)/learn/saving-while-paying-off-debt/page.tsx` + `[locale]` twin.
5. `src/app/sitemap.ts` — 3 entries with alternates.
6. `LearnIndexPage.tsx` — `ICONS.goalsAndDebt` (proposed: `Target`).
7. **Optional (approve/decline):** stage heading value update since the stage now funds dreams too — EN "Crush Your Debt" → "Crush Debt & Fund Goals", FR "Écrasez vos dettes, financez vos objectifs", ES "Aplasta deudas, financia metas" (values only, keys unchanged).

## Verification

Build passes; grep prerendered HTML for swallowed tags (`&lt;strong`); DOM order includes the new key in `crushDebt` stage across en/fr/es; `npm test` (journey guard picks up the new key automatically — build fails if I forget the manifest, which is the system working); ICU lint (no literal braces, no straight-apostrophe-before-tag, fr uses ’). Commit: `feat(learn): add /learn/saving-while-paying-off-debt article on goals + debt`.
