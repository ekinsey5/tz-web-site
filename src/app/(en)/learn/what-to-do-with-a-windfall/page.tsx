import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WindfallInterceptorArticlePage } from "@/components/pages/WindfallInterceptorArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Articles.windfallInterceptor" });
  return buildMetadata("en", ARTICLES.windfallInterceptor.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page() {
  setRequestLocale("en");
  return <WindfallInterceptorArticlePage locale="en" />;
}
