import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MakingABudgetArticlePage } from "@/components/pages/MakingABudgetArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.makingABudget" });
  return buildMetadata("en", ARTICLES.makingABudget.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <MakingABudgetArticlePage locale="en" />;
}
