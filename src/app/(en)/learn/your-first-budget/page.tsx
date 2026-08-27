import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FirstBudgetArticlePage } from "@/components/pages/FirstBudgetArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.firstBudget" });
  return buildMetadata("en", ARTICLES.firstBudget.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <FirstBudgetArticlePage locale="en" />;
}
