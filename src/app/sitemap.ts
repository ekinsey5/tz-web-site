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
