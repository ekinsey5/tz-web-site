import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BudgetWithPartnerArticlePage } from "@/components/pages/BudgetWithPartnerArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.budgetWithPartner" });
  return buildMetadata("en", ARTICLES.budgetWithPartner.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <BudgetWithPartnerArticlePage locale="en" />;
}
