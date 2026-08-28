import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SnowflakePaymentsArticlePage } from "@/components/pages/SnowflakePaymentsArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.snowflakePayments" });
  return buildMetadata("en", ARTICLES.snowflakePayments.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <SnowflakePaymentsArticlePage locale="en" />;
}
