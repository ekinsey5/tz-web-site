import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

const HOMEPAGE_LANGUAGES = {
  "en-US": `${SITE_URL}/`,
  fr: `${SITE_URL}/fr/`,
  es: `${SITE_URL}/es/`,
};

const LEARN_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/`,
  fr: `${SITE_URL}/fr/learn/`,
  es: `${SITE_URL}/es/learn/`,
};

const MAKING_A_BUDGET_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/making-a-budget/`,
  fr: `${SITE_URL}/fr/learn/making-a-budget/`,
  es: `${SITE_URL}/es/learn/making-a-budget/`,
};

const FIRST_BUDGET_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/your-first-budget/`,
  fr: `${SITE_URL}/fr/learn/your-first-budget/`,
  es: `${SITE_URL}/es/learn/your-first-budget/`,
};

const ENVELOPE_BUDGETING_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/envelope-budgeting/`,
  fr: `${SITE_URL}/fr/learn/envelope-budgeting/`,
  es: `${SITE_URL}/es/learn/envelope-budgeting/`,
};

const SINKING_FUNDS_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/sinking-funds/`,
  fr: `${SITE_URL}/fr/learn/sinking-funds/`,
  es: `${SITE_URL}/es/learn/sinking-funds/`,
};

const IRREGULAR_PAYCHECK_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/irregular-paycheck/`,
  fr: `${SITE_URL}/fr/learn/irregular-paycheck/`,
  es: `${SITE_URL}/es/learn/irregular-paycheck/`,
};

const CATCH_OVERSPENDING_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/catch-overspending-early/`,
  fr: `${SITE_URL}/fr/learn/catch-overspending-early/`,
  es: `${SITE_URL}/es/learn/catch-overspending-early/`,
};

const SNOWFLAKE_PAYMENTS_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/snowflake-payments/`,
  fr: `${SITE_URL}/fr/learn/snowflake-payments/`,
  es: `${SITE_URL}/es/learn/snowflake-payments/`,
};

const PAY_OFF_DEBT_FASTER_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/pay-off-debt-faster/`,
  fr: `${SITE_URL}/fr/learn/pay-off-debt-faster/`,
  es: `${SITE_URL}/es/learn/pay-off-debt-faster/`,
};

const WINDFALL_INTERCEPTOR_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/what-to-do-with-a-windfall/`,
  fr: `${SITE_URL}/fr/learn/what-to-do-with-a-windfall/`,
  es: `${SITE_URL}/es/learn/what-to-do-with-a-windfall/`,
};

const CAN_I_AFFORD_THIS_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/can-i-afford-this/`,
  fr: `${SITE_URL}/fr/learn/can-i-afford-this/`,
  es: `${SITE_URL}/es/learn/can-i-afford-this/`,
};

const AI_FINANCIAL_COACH_LANGUAGES = {
  "en-US": `${SITE_URL}/learn/ai-financial-coach/`,
  fr: `${SITE_URL}/fr/learn/ai-financial-coach/`,
  es: `${SITE_URL}/es/learn/ai-financial-coach/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: HOMEPAGE_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: HOMEPAGE_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: HOMEPAGE_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: LEARN_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: LEARN_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: LEARN_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/making-a-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: MAKING_A_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/making-a-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: MAKING_A_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/making-a-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: MAKING_A_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/your-first-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: FIRST_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/your-first-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: FIRST_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/your-first-budget/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: FIRST_BUDGET_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/envelope-budgeting/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: ENVELOPE_BUDGETING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/envelope-budgeting/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: ENVELOPE_BUDGETING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/envelope-budgeting/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: ENVELOPE_BUDGETING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/sinking-funds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SINKING_FUNDS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/sinking-funds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SINKING_FUNDS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/sinking-funds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SINKING_FUNDS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/irregular-paycheck/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: IRREGULAR_PAYCHECK_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/irregular-paycheck/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: IRREGULAR_PAYCHECK_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/irregular-paycheck/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: IRREGULAR_PAYCHECK_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/catch-overspending-early/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CATCH_OVERSPENDING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/catch-overspending-early/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CATCH_OVERSPENDING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/catch-overspending-early/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CATCH_OVERSPENDING_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/snowflake-payments/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SNOWFLAKE_PAYMENTS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/snowflake-payments/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SNOWFLAKE_PAYMENTS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/snowflake-payments/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: SNOWFLAKE_PAYMENTS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/pay-off-debt-faster/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: PAY_OFF_DEBT_FASTER_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/pay-off-debt-faster/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: PAY_OFF_DEBT_FASTER_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/pay-off-debt-faster/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: PAY_OFF_DEBT_FASTER_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/what-to-do-with-a-windfall/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: WINDFALL_INTERCEPTOR_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/what-to-do-with-a-windfall/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: WINDFALL_INTERCEPTOR_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/what-to-do-with-a-windfall/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: WINDFALL_INTERCEPTOR_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/can-i-afford-this/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CAN_I_AFFORD_THIS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/can-i-afford-this/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CAN_I_AFFORD_THIS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/can-i-afford-this/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: CAN_I_AFFORD_THIS_LANGUAGES },
    },
    {
      url: `${SITE_URL}/learn/ai-financial-coach/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: AI_FINANCIAL_COACH_LANGUAGES },
    },
    {
      url: `${SITE_URL}/fr/learn/ai-financial-coach/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: AI_FINANCIAL_COACH_LANGUAGES },
    },
    {
      url: `${SITE_URL}/es/learn/ai-financial-coach/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: AI_FINANCIAL_COACH_LANGUAGES },
    },
    {
      url: `${SITE_URL}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
