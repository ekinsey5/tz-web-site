import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoalsAndDebtArticlePage } from "@/components/pages/GoalsAndDebtArticlePage";
import { buildMetadata } from "@/lib/seo";
import { ARTICLES } from "@/content/site";
import { NON_DEFAULT_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

// Also required here (not just in layout.tsx) — `next dev` checks each
// segment file independently for output:"export" dynamic-route coverage,
// even though the production static build already resolves this correctly
// from the layout alone.
export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "Articles.goalsAndDebt" });
  return buildMetadata(locale, ARTICLES.goalsAndDebt.path, {
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return <GoalsAndDebtArticlePage locale={locale} />;
}
