/**
 * Tether Zero — marketing site content
 * =====================================
 * Single source of truth for all section copy, pricing constants and URLs.
 * Edit copy here; components read from this module. Kept string-first so it can
 * be wrapped in an i18n layer (en / fr / es) later without touching components.
 *
 * Grounding note: every feature claim is sourced from the Tether Zero PRDs
 * (tether-core/docs/prd). Claims the PRDs do NOT support (e.g. "privacy mode",
 * blanket "encryption at rest") are intentionally omitted. Items needing
 * product-owner confirmation are collected in PLACEHOLDERS below.
 */

/* ------------------------------------------------------------------ */
/* Constants — edit these to update pricing / destinations everywhere  */
/* ------------------------------------------------------------------ */

export const APP_URLS = {
  /** Primary trial / sign-up route (confirmed). */
  register: "https://app.tether-zero.com/register",
  /** App login route (confirmed). */
  login: "https://app.tether-zero.com/login",
  /** Footer legal links — point to existing app routes (assumed). */
  privacy: "https://app.tether-zero.com/privacy",
  terms: "https://app.tether-zero.com/terms",
  contact: "mailto:hello@tether-zero.com",
} as const;

export const PRICING = {
  trialDays: 30,
  currencySymbol: "$",
  /** Monthly plan rate. */
  monthly: 10.99,
  /** Annual plan: 30% below monthly, expressed per-month and billed yearly. */
  annualPerMonth: 7.69, // 10.99 * 0.70, rounded
  annualPerYear: 92.28, // 7.69 * 12
  /** Monthly rate annualized, for the savings comparison. */
  monthlyAnnualized: 131.88, // 10.99 * 12
  annualSavingsPercent: 30,
  annualSavingsPerYear: 39.6, // 131.88 - 92.28
} as const;

export const BRAND = {
  name: "Tether Zero",
  company: "Springthought",
  year: 2026,
  /** Short positioning line used in meta + footer. */
  tagline: "Get to zero — and stay there.",
  description:
    "Tether Zero combines debt payoff, budgeting and a personal AI coach in one calm, guided app — so every dollar has a job and you always know your freedom date.",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string; // in-page anchor
}

export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Debt Crusher", href: "#debt-crusher" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why us", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

/* ------------------------------------------------------------------ */
/* Hero (#home)                                                        */
/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "Debt payoff · Budgeting · AI coaching",
  // Single H1 for the page.
  heading: "Become debt-free with a plan you can actually follow.",
  subheading:
    "Tether Zero brings debt payoff, budgeting and a personal AI coach into one calm, guided app — so every dollar has a job and you always know your freedom date.",
  primaryCta: { label: "Start your 30-day free trial", href: APP_URLS.register },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  // Trust signals — all confirmed in the PRDs.
  trust: [
    "Read-only bank connections",
    "Bank credentials encrypted (AES-256-GCM)",
    "Export or delete your data anytime",
  ],
  image: {
    src: "/screenshots/hero.png",
    alt: "Tether Zero Debt Crusher dashboard showing a projected debt-free date of May 2028, remaining debt, interest saved, payoff progress and the monthly debt budget.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* How it works (#how-it-works)                                        */
/* ------------------------------------------------------------------ */

export interface Step {
  number: number;
  title: string;
  body: string;
}

export const HOW_IT_WORKS: { heading: string; subheading: string; steps: Step[] } = {
  heading: "From scattered accounts to a clear payoff plan",
  subheading:
    "Four steps to take control of your money — most people are up and running in minutes.",
  steps: [
    {
      number: 1,
      title: "Connect or add your accounts",
      body: "Securely link your banks with read-only access through Plaid, or add accounts by hand. Transactions sync automatically so you stop entering them one by one.",
    },
    {
      number: 2,
      title: "Build a budget in minutes",
      body: "The Smart Budget Wizard asks a few questions about your life and seeds a personalized, zero-based budget — only the categories you actually need, not a generic template you have to prune.",
    },
    {
      number: 3,
      title: "Pick your payoff strategy",
      body: "Choose snowball or avalanche and the Debt Crusher projects your debt-free date, the interest you'll save and the months you'll shave off — recalculated instantly.",
    },
    {
      number: 4,
      title: "Stay on track with Zero",
      body: "Your AI coach answers money questions in plain language and flags what needs attention — and always confirms with you before making any change.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Capabilities grid (#features)                                       */
/* ------------------------------------------------------------------ */

export interface Feature {
  icon: string; // lucide-react icon name (mapped in FeatureCard)
  title: string;
  body: string;
}

export const FEATURES: { heading: string; subheading: string; items: Feature[] } = {
  heading: "Everything you need to reach zero",
  subheading:
    "One app for paying down debt, budgeting with intention and understanding your money.",
  items: [
    {
      icon: "Target",
      title: "Debt Crusher Engine",
      body: "Compare snowball and avalanche side by side, see a projected debt-free date, and apply windfall “snowflake” payments to get there faster.",
    },
    {
      icon: "Wallet",
      title: "Hybrid budgeting",
      body: "Zero-based budgeting with sinking funds and smart splits, so every dollar has a job and irregular bills never catch you off guard.",
    },
    {
      icon: "RefreshCw",
      title: "Automatic transaction sync",
      body: "Read-only Plaid connections import transactions for you, and Smart Match learns your categories as you go.",
    },
    {
      icon: "Sparkles",
      title: "Zero, your AI coach",
      body: "Ask questions in plain language and get answers grounded in your real household data — with a confirmation before any change.",
    },
    {
      icon: "LineChart",
      title: "Freedom Dashboard & insights",
      body: "Net worth, income vs. expense, age of money and top payees — plus a forward-looking burndown to your freedom date.",
    },
    {
      icon: "Flag",
      title: "Goals & milestones",
      body: "Set shared savings goals, track pacing, and mark milestones at 25/50/75/100% as your goal image comes into focus.",
    },
    {
      icon: "Users",
      title: "Shared household access",
      body: "Invite a partner or advisor by email with role-based permissions — Admin, Editor or Viewer — without sharing a login.",
    },
    {
      icon: "Languages",
      title: "Available in three languages",
      body: "Use Tether Zero in English, French or Spanish across budgets, goals and insights.",
    },
    {
      icon: "ShieldCheck",
      title: "Privacy & security",
      body: "Read-only bank access, AES-256-GCM-encrypted credentials, and one-click data export or account deletion (GDPR/CCPA).",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Feature spotlights (#debt-crusher, #insights, #coach)               */
/* ------------------------------------------------------------------ */

export interface Spotlight {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  image: { src: string; alt: string };
  /** Image side on desktop. */
  imageSide: "left" | "right";
}

export const SPOTLIGHTS: Spotlight[] = [
  {
    id: "debt-crusher",
    eyebrow: "Debt Crusher Engine",
    heading: "See your debt-free date — and pull it closer.",
    body: "Toggle between snowball and avalanche and watch the projection recalculate instantly, right in your browser. The Debt Crusher accounts for promotional APRs, rolls each freed-up minimum payment into your next debt, and shows the interest and months you'll save versus paying the minimums.",
    bullets: [
      "Snowball vs. avalanche, compared side by side",
      "A projected debt-free date with interest and months saved",
      "Apply a bonus or tax refund as a “snowflake” and see the impact",
      "Month-by-month amortization for every debt",
    ],
    image: {
      src: "/screenshots/debt-crusher.png",
      alt: "Tether Zero Debt Crusher dashboard showing snowball versus avalanche payoff projections and a debt-free date.",
    },
    imageSide: "right",
  },
  {
    id: "insights",
    eyebrow: "Freedom Dashboard & Insights",
    heading: "A dashboard that looks forward, not just back.",
    body: "Most apps tell you where your money went. Tether Zero also shows where you're headed: a Freedom Horizon burndown projects your path to debt-free, while wellness cards track net worth, income vs. expense, age of money and your top payees — each with period-over-period trends.",
    bullets: [
      "Forward-looking burndown to your freedom date",
      "Net worth and income-vs-expense at a glance",
      "Age of money and top-payee insights",
      "Period-over-period trends so you can see progress",
    ],
    image: {
      src: "/screenshots/insights.png",
      alt: "Tether Zero Insights dashboard with cards for spending, net income, income versus expense, net worth, top categories, age of money and savings rate.",
    },
    imageSide: "left",
  },
  {
    id: "coach",
    eyebrow: "Meet Zero",
    heading: "An AI coach that does more than explain.",
    body: "Zero answers questions in plain language using your real household numbers — “Am I on track this month?”, “Snowball or avalanche?” — and suggests next steps based on your role. It always confirms before making a change, so you stay in control.",
    bullets: [
      "Conversational guidance grounded in your data",
      "Proactive nudges on what needs your attention",
      "Role-aware: suggestions for editors, explanations for viewers",
      "Confirmation-first — nothing changes without your yes",
    ],
    image: {
      src: "/screenshots/coach.png",
      alt: "Tether Zero's AI coach Zero answering whether a $500 purchase fits the user's plan, showing the impact on their debt-free date with options to redirect the money to debt or proceed.",
    },
    imageSide: "right",
  },
];

/* ------------------------------------------------------------------ */
/* Competitive matrix (#compare)                                       */
/* ------------------------------------------------------------------ */

export const COMPARE: {
  heading: string;
  subheading: string;
  columns: [string, string, string];
  rows: { capability: string; tetherZero: string; ynab: string; everyDollar: string }[];
  footnote: string;
} = {
  heading: "Why Tether Zero",
  subheading:
    "How Tether Zero compares with two popular budgeting apps. Each app is great at what it does — here's where Tether Zero focuses.",
  columns: ["Tether Zero", "YNAB", "EveryDollar"],
  rows: [
    {
      capability: "Guidance",
      tetherZero: "Active AI coach",
      ynab: "Passive education",
      everyDollar: "Passive coaching",
    },
    {
      capability: "Debt strategy",
      tetherZero: "Snowball & avalanche simulator",
      ynab: "Static accounts",
      everyDollar: "Rigid snowball",
    },
    {
      capability: "Forecasting",
      tetherZero: "12–24 month projection",
      ynab: "Present only",
      everyDollar: "Current month only",
    },
    {
      capability: "Visuals",
      tetherZero: "Dynamic, forward-looking",
      ynab: "Static charts (past)",
      everyDollar: "Simple progress bars",
    },
    {
      capability: "Couples",
      tetherZero: "Role-based access (Admin/Viewer)",
      ynab: "Shared login",
      everyDollar: "Shared login",
    },
  ],
  footnote:
    "Comparison reflects Tether Zero's product focus and is provided for general guidance. Competitor capabilities change over time — check each provider for current details.",
};

/* ------------------------------------------------------------------ */
/* Pricing (#pricing)                                                  */
/* ------------------------------------------------------------------ */

export interface PlanFeature {
  label: string;
}

export const PRICING_SECTION = {
  heading: "Simple pricing, no surprises",
  subheading:
    "Start with a 30-day free trial. Keep going for less than the cost of a couple of coffees a month.",
  trial: {
    name: "Free trial",
    badge: "Start here",
    priceLabel: "Free",
    cadence: `for ${PRICING.trialDays} days`,
    description: "Full access to every feature so you can build your plan before you pay.",
    features: [
      "Every Premium feature included",
      "Build your budget and payoff plan",
      "No long-term commitment",
    ],
    cta: { label: "Start free trial", href: APP_URLS.register },
  },
  premium: {
    name: "Premium",
    badge: "Most popular",
    description: "Everything in Tether Zero, billed monthly or annually.",
    features: [
      "Debt Crusher Engine & strategy simulator",
      "Hybrid budgeting, sinking funds & smart splits",
      "Automatic bank sync via Plaid (read-only)",
      "Zero, your AI coach",
      "Freedom Dashboard & insights",
      "Shared household access (Admin / Editor / Viewer)",
      "English, French & Spanish",
    ],
    cta: { label: "Start your free trial", href: APP_URLS.register },
  },
  // Note required by the brief.
  note: "Automatic bank sync via Plaid is a Premium feature.",
} as const;

/* ------------------------------------------------------------------ */
/* FAQ (#faq)                                                          */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: { heading: string; items: FaqItem[] } = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "What happens after the 30-day free trial?",
      a: "Your trial includes full access to every feature. When it ends, you can subscribe to Premium — $10.99 per month, or $92.28 per year ($7.69 per month) — to keep your budget, debt plan and insights going.",
    },
    {
      q: "Is my bank data safe?",
      a: "Yes. Bank connections use Plaid with read-only permissions, which means Tether Zero can see your transactions and balances but can never move money. Stored bank credentials are encrypted with AES-256-GCM.",
    },
    {
      q: "Can my partner share the account?",
      a: "Yes. Create a household and invite a partner or financial advisor by email with a role — Admin, Editor or Viewer — so you collaborate on the same data without sharing a single login.",
    },
    {
      q: "Which countries and banks are supported?",
      a: "Tether Zero connects to banks through Plaid. Specific country and institution coverage is being finalized — contact us for the latest supported list.",
    },
    {
      q: "Can I cancel anytime?",
      a: "You can manage or cancel your subscription from your account settings. Exact cancellation and refund terms are confirmed at checkout.",
    },
    {
      q: "Does it work on mobile?",
      a: "Tether Zero runs in your web browser, and this site is fully responsive. A mobile-optimized app experience is on the roadmap — reach out if you'd like updates.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Final CTA (#cta)                                                    */
/* ------------------------------------------------------------------ */

export const FINAL_CTA = {
  heading: "Ready to get to zero?",
  body: "Start your 30-day free trial and see your freedom date today.",
  cta: { label: "Start your 30-day free trial", href: APP_URLS.register },
} as const;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER = {
  tagline: "Debt payoff, budgeting and an AI coach in one calm app.",
  links: [
    { label: "Privacy Policy", href: APP_URLS.privacy },
    { label: "Terms", href: APP_URLS.terms },
    { label: "Contact", href: APP_URLS.contact },
  ],
  copyright: `© ${BRAND.year} ${BRAND.company}. All rights reserved.`,
  attribution: `${BRAND.name} is a product of ${BRAND.company}.`,
} as const;

/* ------------------------------------------------------------------ */
/* Placeholders needing product-owner confirmation (surfaced in README)*/
/* ------------------------------------------------------------------ */

export const PLACEHOLDERS: string[] = [
  "Sign-up URL (app.tether-zero.com/register) and login URL — confirmed for this build; verify before launch.",
  "Footer legal links (Privacy, Terms) point to assumed app routes; confirm real URLs.",
  "Contact address (hello@tether-zero.com) is assumed; confirm.",
  "Annual pricing rounding ($7.69/mo, $92.28/yr) derived from $10.99 × 0.70; confirm exact figures.",
  "Post-trial behavior if the user does not subscribe (read-only vs. locked) — not specified in PRDs.",
  "Supported countries/banks (Plaid coverage) — list not specified.",
  "Cancellation/refund policy — not specified in PRDs.",
  "Mobile app availability/timeline — app is currently desktop-first per design system.",
  "Competitive one-pager (marketing.pdf) could not be parsed (no PDF renderer available); matrix uses the brief-provided values. Reconcile with the one-pager before launch.",
];
