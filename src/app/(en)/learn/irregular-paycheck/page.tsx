import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IrregularPaycheckArticlePage } from "@/components/pages/IrregularPaycheckArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.irregularPaycheck" });
  return buildMetadata("en", ARTICLES.irregularPaycheck.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <IrregularPaycheckArticlePage locale="en" />;
}
