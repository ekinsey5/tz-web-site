import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SinkingFundsArticlePage } from "@/components/pages/SinkingFundsArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.sinkingFunds" });
  return buildMetadata("en", ARTICLES.sinkingFunds.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <SinkingFundsArticlePage locale="en" />;
}
