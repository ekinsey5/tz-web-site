import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BudgetJourneyArticlePage } from "@/components/pages/BudgetJourneyArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.budgetJourney" });
  return buildMetadata("en", ARTICLES.budgetJourney.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <BudgetJourneyArticlePage locale="en" />;
}
