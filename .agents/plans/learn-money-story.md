# Plan — /learn article: "Reading Your Money Story" (Insights)

Status: awaiting approval. No article files written yet.

## Front matter (proposed)

```yaml
topic: "The Insights dashboard's financial cards as a monthly narrative — net worth, age of money, income vs. expense"
primary_feature_area: "Insights dashboard (Financial tab cards: Net Worth, Age of Money, Income vs. Expense)"
target_reader: "new signup, pre- or just-post-onboarding"
primary_keyword: "age of money"
secondary_keywords: ["net worth tracker", "income vs expenses", "budget insights", "financial trend tracking"]
word_count_target: "900-1300"
cta_goal: "start free trial"
slug: /learn/reading-your-money-story
```

- **H1/title (user-supplied):** "Reading Your Money Story: Net Worth, Age of Money, and Your Income-vs-Expenses Trend"
- **meta.title:** "Reading Your Money Story" (main-clause convention)
- **Article key:** `moneyStory` · **datePublished:** 2026-08-28 · **Icon:** `BookOpen` (lucide)
- **Journey stage:** `coachRefine`, placed **before** `aiFinancialCoach` — read the story, then refine it with the coach (deliberate reorder within the stage; the guard permits any order)
- **Related links:** `<link>` → ai-financial-coach (Zero interprets the trends), `<link2>` → catch-overspending-early (Spending Pace watches the current month; Insights reads the long arc)

## Ground truth (verified in shipped code/PRDs)

| Claim | Source |
|---|---|
| Insights lives in the sidebar ("Insights" / « Perspectives » / «Perspectivas»), Financial tab ("Financial"/"Finances"/"Finanzas"), with date ranges This Month → Last Year plus Custom | `navigation.sidebar.insights`, `insights.tabs`, `insights.dateRange` |
| **Net Worth** = sum of asset balances − sum of liability balances (credit cards + loans are the liabilities); big number plus delta vs. period start; line chart at weekly (≤90d) or monthly (>90d) intervals | PRD-TZ-116 acceptance criteria |
| Negative net worth is a designed-for state: visible zero line, red below / green above — the chart expects people starting under zero | PRD-TZ-116 ("Given net worth is negative…") |
| **Age of Money** = "the average days between income arrival and equivalent spending — … whether I'm spending last week's income or last month's" (PRD user story, quoted); FIFO income-matching; **higher = better**; displays "365+" when capped; requires cleared transactions; unmatched-expense tooltip | PRD-TZ-117 + `insights.cards.ageOfMoney` |
| **Income vs. Expense** = side-by-side comparison by month over the range | `insights.cards.incomeVsExpense`, month table headers |
| Cards click through to a detail view with the underlying transactions | PRD-TZ-107 Card Detail Page Shell, `CardDetailContent.tsx`, `InsightsTransactionTable.tsx` |
| The dashboard is customizable (show/hide cards) and holds more: Top Payees, Spending, Pacing Gauge, Freedom tab (Freedom Horizon, Interest vs. Principal), Goals tab | `DashboardCustomizePanel.tsx`, `insights.cards.*`, `insights.tabs` |
| Localized card names quoted per locale: Valeur nette / Âge de l'argent / Revenus vs Dépenses · Patrimonio neto / Edad del dinero / Ingresos vs. Gastos | fr/es locale files |

Honesty guardrails: no claims about forecasting or advice from the cards themselves (interpretation is Zero's job); Age of Money mechanics described only as far as the PRD does (FIFO matching, cap, cleared-only).

## Skeleton (intro + 6 sections × 2 ¶ + CTA; template = SpendingTagsArticlePage)

1. **intro** — A budget tells you what to do this month; it's quieter about how the months are adding up. Numbers in motion tell a story — and Tether-Zero's Insights dashboard reads three of its chapters.
2. **whereTheStoryLives** (Compass) — the Insights page: Financial tab, date ranges from This Month to Last Year plus Custom; every card is a chapter, and each opens into the transactions behind it.
3. **netWorthChapter** (TrendingUp) — the wide-angle shot: everything you own minus everything you owe (credit cards and loans on the owing side); the delta since period start; and the below-zero design — the chart draws a zero line and colors the climb, because starting negative is a story of progress, not shame.
4. **ageOfMoneyChapter** (Hourglass) — the tempo: how many days money sits before it's spent; PRD's own framing ("last week's income or last month's"); FIFO matching intuition; higher is better; the 365+ cap; needs cleared transactions.
5. **incomeVsExpenseChapter** (BarChart3) — the engine: two bars per month; the gap between them is the raw material every other feature spends — debt payments, goal contributions, breathing room. Trends beat snapshots: one tight month is noise, three is a plot line.
6. **readingItTogether** (BookOpen) — how the chapters connect (gap widens → money ages → net worth climbs); zooming with ranges; a worked mini-narrative in honest, hedged terms.
7. **fromStoryToNextChapter** (Sparkles) — customize which cards show; the other chapters waiting (Top Payees, Pacing Gauge, the Freedom tab); and when a trend needs interpreting, ask <link>Zero</link> — while <link2>Spending Pace</link2> guards the current month, Insights is where the long arc lives.
8. **cta** — "Your money has a story. Read it." / start your 30-day free trial.

(Sections 2–7 are the component's six SECTIONS.)

## Files (established recipe)

1. `site.ts` — `ARTICLES.moneyStory` + insert into `LEARN_JOURNEY` `coachRefine` before `aiFinancialCoach`
2. `messages/{en,fr,es}.json` — `Learn.articles.moneyStory` + `Articles.moneyStory` (anchored splice after the current last key, peer-safe)
3. `MoneyStoryArticlePage.tsx` (copy template; wire link/link2) · 4. Two thin routes under `learn/reading-your-money-story/` · 5. `sitemap.ts` ×3 · 6. `LearnIndexPage.tsx` `ICONS.moneyStory: BookOpen`

## Verification & commit

Lint, journey-guard tests, production build; swallowed-tag grep on all three prerendered pages; index DOM order shows `moneyStory` before `ai-financial-coach` in the coachRefine block in en/fr/es; ICU lint (no braces, fr ’, « »/«» quote conventions). Commit: `feat(learn): add /learn/reading-your-money-story article on insights`, path-scoped.
