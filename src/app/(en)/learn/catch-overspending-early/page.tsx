import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatchOverspendingEarlyArticlePage } from "@/components/pages/CatchOverspendingEarlyArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.catchOverspendingEarly" });
  return buildMetadata("en", ARTICLES.catchOverspendingEarly.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <CatchOverspendingEarlyArticlePage locale="en" />;
}
