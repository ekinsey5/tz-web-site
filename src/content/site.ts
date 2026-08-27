/**
 * Tether-Zero — marketing site structural content
 * =================================================
 * Locale-independent constants only: pricing numbers, URLs, image paths,
 * icon names, and other structure that doesn't get translated. All
 * user-facing copy lives in messages/{locale}.json (see src/i18n/request.ts)
 * and is read via next-intl's useTranslations/getTranslations.
 *
 * Grounding note: every feature claim is sourced from the Tether-Zero PRDs
 * (tether-core/docs/prd). Claims the PRDs do NOT support (e.g. "privacy mode",
 * blanket "encryption at rest") are intentionally omitted. Items needing
 * product-owner confirmation are collected in PLACEHOLDERS below.
 */

/* ------------------------------------------------------------------ */
/* Constants — edit these to update pricing / destinations everywhere  */
/* ------------------------------------------------------------------ */

/** Canonical marketing domain — no www; CloudFront redirects www to apex. */
export const SITE_URL = "https://tether-zero.com";

export const APP_URLS = {
  /** Primary trial / sign-up route (confirmed). */
  register: "https://app.tether-zero.com/register",
  /** App login route (confirmed). */
  login: "https://app.tether-zero.com/login",
  /** Footer legal links — canonical legal pages live on this marketing site. */
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
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
  name: "Tether-Zero",
  company: "SpringThought, LLC",
  year: 2026,
} as const;

/* ------------------------------------------------------------------ */
/* Navigation — labels live in messages.Nav.links, keyed by id         */
/* ------------------------------------------------------------------ */

export interface NavLink {
  id: string;
  href: string; // in-page anchor, or a root-relative path (locale-prefixed by Nav)
}

export const NAV_LINKS: NavLink[] = [
  { id: "howItWorks", href: "#how-it-works" },
  { id: "features", href: "#features" },
  { id: "debtCrusher", href: "#debt-crusher" },
  { id: "pricing", href: "#pricing" },
  { id: "whyUs", href: "#compare" },
  { id: "learn", href: "/learn/" },
  { id: "faq", href: "#faq" },
];

/* ------------------------------------------------------------------ */
/* Hero (#home) — copy lives in messages.Hero                          */
/* ------------------------------------------------------------------ */

export const HERO = {
  primaryCtaHref: APP_URLS.register,
  secondaryCtaHref: "#how-it-works",
  imageSrc: "/screenshots/hero.png",
} as const;

/* ------------------------------------------------------------------ */
/* How it works (#how-it-works) — copy lives in messages.HowItWorks    */
/* ------------------------------------------------------------------ */

export const HOW_IT_WORKS_STEP_NUMBERS = [1, 2, 3, 4] as const;

/* ------------------------------------------------------------------ */
/* Capabilities grid (#features) — copy lives in messages.Features     */
/* ------------------------------------------------------------------ */

/** lucide-react icon names, in the same order as messages.Features.items. */
export const FEATURE_ICONS = [
  "Target",
  "Wallet",
  "RefreshCw",
  "Sparkles",
  "LineChart",
  "Flag",
  "Users",
  "Languages",
  "ShieldCheck",
] as const;

/* ------------------------------------------------------------------ */
/* Feature spotlights (#debt-crusher, #insights, #coach)               */
/* Copy lives in messages.Spotlights.<id>; this is just the structure. */
/* ------------------------------------------------------------------ */

export interface SpotlightMeta {
  id: string;
  messageKey: "debtCrusher" | "insights" | "coach";
  image: { src: string };
  /** Image side on desktop. */
  imageSide: "left" | "right";
}

export const SPOTLIGHTS: SpotlightMeta[] = [
  {
    id: "debt-crusher",
    messageKey: "debtCrusher",
    image: { src: "/screenshots/debt-crusher.png" },
    imageSide: "right",
  },
  {
    id: "insights",
    messageKey: "insights",
    image: { src: "/screenshots/insights.png" },
    imageSide: "left",
  },
  {
    id: "coach",
    messageKey: "coach",
    image: { src: "/screenshots/coach.png" },
    imageSide: "right",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing (#pricing) — copy lives in messages.Pricing                 */
/* ------------------------------------------------------------------ */

export const PRICING_URLS = {
  trialCtaHref: APP_URLS.register,
  premiumCtaHref: APP_URLS.register,
} as const;

/* ------------------------------------------------------------------ */
/* Final CTA (#cta) — copy lives in messages.FinalCta                  */
/* ------------------------------------------------------------------ */

export const FINAL_CTA_HREF = APP_URLS.register;

/* ------------------------------------------------------------------ */
/* Learn section (/learn) — copy lives in messages.Learn and           */
/* messages.Articles; this is just the structure. Unlike the legal     */
/* pages, Learn routes exist in every locale (/learn, /fr/learn, …).   */
/* ------------------------------------------------------------------ */

export const LEARN_PATH = "/learn/";

export const ARTICLES = {
  makingABudget: {
    slug: "making-a-budget",
    path: "/learn/making-a-budget/",
    /** ISO date for Article JSON-LD datePublished/dateModified. */
    datePublished: "2026-08-24",
    /** FTC source credited in the end-of-article attribution footnote. */
    sourceUrl: "https://consumer.gov/your-money/making-budget",
  },
  firstBudget: {
    slug: "your-first-budget",
    path: "/learn/your-first-budget/",
    /** ISO date for Article JSON-LD datePublished/dateModified. */
    datePublished: "2026-08-27",
  },
  envelopeBudgeting: {
    slug: "envelope-budgeting",
    path: "/learn/envelope-budgeting/",
    /** ISO date for Article JSON-LD datePublished/dateModified. */
    datePublished: "2026-08-27",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Footer — labels live in messages.Footer; hrefs stay here            */
/* ------------------------------------------------------------------ */

export const FOOTER_LINKS = [
  /** `localized: true` → Footer prefixes the href for non-default locales. */
  { id: "learn", href: LEARN_PATH, localized: true },
  { id: "privacyPolicy", href: APP_URLS.privacy },
  { id: "terms", href: APP_URLS.terms },
  { id: "contact", href: APP_URLS.contact },
] as const;

/* ------------------------------------------------------------------ */
/* Placeholders needing product-owner confirmation (surfaced in README)*/
/* ------------------------------------------------------------------ */

export const PLACEHOLDERS: string[] = [
  "Sign-up URL (app.tether-zero.com/register) and login URL — confirmed for this build; verify before launch.",
  "Legal pages (/privacy-policy, /terms-of-service) are hosted on this marketing site as the canonical copies and the footer links are CONFIRMED live (both resolve HTTP 200 in production via the CloudFront edge router); the same SMS/Plaid/Unsplash/CCPA sections are mirrored in the app (tether-web) — keep both in sync.",
  "Toll-Free A2P number CONFIRMED as +1 (855) 529-5178 and filled into the Privacy Policy Mobile Messaging (STOP) section; register the A2P campaign under this same number.",
  "SMS HELP contact CONFIRMED as support@tether-zero.com and filled into the Privacy Policy Mobile Messaging (HELP) section.",
  "Legal 'Last Updated' / effective date set to the publish date (June 19, 2026) across both repos; update when the policy is next materially revised.",
  "Brand/DBA confirmed as 'Tether-Zero' (hyphen), legal entity 'SpringThought, LLC'. Renamed across shipped src + tests in both repos and added explicit 'doing business as' language; the app's Terms entity was corrected from 'Tether Zero, Inc.' to SpringThought, LLC. NOT updated: internal docs/README/CLAUDE.md/design-ref (still say 'Tether Zero'), and the es/fr legal intros lack the formal DBA clause (needs a translator). Register the A2P brand exactly as 'Tether-Zero' to match the site and message content.",
  "Contact email domain unified to the hyphenated tether-zero.com across both repos (privacy@/legal@/support@/hello@). Confirm these mailboxes exist before carrier submission. This marketing site (tz-web-site) is fully reconciled on the hyphenated apex domain (canonical/sitemap/robots/OG all use https://tether-zero.com as of 2026-07-03). REMAINING: the app repo (tether-web / app.tether-zero.com) still needs its page metadata/canonical URLs and JSON-LD checked for the non-hyphen domain (tetherzero.com) — fix in that repo.",
  "Contact address (hello@tether-zero.com) is assumed; confirm.",
  "Annual pricing rounding ($7.69/mo, $92.28/yr) derived from $10.99 × 0.70; confirm exact figures.",
  "Post-trial behavior if the user does not subscribe (read-only vs. locked) — not specified in PRDs.",
  "Supported countries/banks (Plaid coverage) — list not specified.",
  "Cancellation/refund policy — not specified in PRDs.",
  "Mobile app availability/timeline — app is currently desktop-first per design system.",
  "Competitive one-pager (marketing.pdf) could not be parsed (no PDF renderer available); matrix uses the brief-provided values. Reconcile with the one-pager before launch.",
];
