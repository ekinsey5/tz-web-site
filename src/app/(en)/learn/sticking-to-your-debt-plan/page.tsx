import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StickToDebtPlanArticlePage } from "@/components/pages/StickToDebtPlanArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.stickToDebtPlan" });
  return buildMetadata("en", ARTICLES.stickToDebtPlan.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <StickToDebtPlanArticlePage locale="en" />;
}
