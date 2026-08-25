import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/pages/HomePage";
import { NON_DEFAULT_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

// Also required here (not just in layout.tsx) — `next dev` checks each
// segment file independently for output:"export" dynamic-route coverage,
// even though the production static build already resolves this correctly
// from the layout alone.
export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return <HomePage locale={locale} />;
}
