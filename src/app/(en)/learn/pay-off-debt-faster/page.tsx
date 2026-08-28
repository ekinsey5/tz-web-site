import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PayOffDebtFasterArticlePage } from "@/components/pages/PayOffDebtFasterArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.payOffDebtFaster" });
  return buildMetadata("en", ARTICLES.payOffDebtFaster.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <PayOffDebtFasterArticlePage locale="en" />;
}
