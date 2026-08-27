import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvelopeBudgetingArticlePage } from "@/components/pages/EnvelopeBudgetingArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.envelopeBudgeting" });
  return buildMetadata("en", ARTICLES.envelopeBudgeting.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <EnvelopeBudgetingArticlePage locale="en" />;
}
