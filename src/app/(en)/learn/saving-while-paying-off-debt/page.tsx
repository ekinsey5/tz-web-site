import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoalsAndDebtArticlePage } from "@/components/pages/GoalsAndDebtArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.goalsAndDebt" });
  return buildMetadata("en", ARTICLES.goalsAndDebt.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <GoalsAndDebtArticlePage locale="en" />;
}
