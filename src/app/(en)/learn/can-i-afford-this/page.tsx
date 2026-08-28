import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CanIAffordThisArticlePage } from "@/components/pages/CanIAffordThisArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.canIAffordThis" });
  return buildMetadata("en", ARTICLES.canIAffordThis.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <CanIAffordThisArticlePage locale="en" />;
}
