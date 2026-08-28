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
