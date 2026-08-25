import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { RootDocument } from "@/components/RootDocument";
import { buildMetadata } from "@/lib/seo";
import { NON_DEFAULT_LOCALES, type Locale } from "@/i18n/config";

// Static export requires every dynamic segment to be listed here — Next
// never invokes this route outside ['fr','es']. There is no /en/ route;
// English lives unprefixed under (en). (Deliberately no `dynamicParams =
// false` alongside this — that Route Segment Config option is a no-op under
// output:"export" since static export can't render unlisted params anyway,
// and setting it confuses `next dev` into a false "missing
// generateStaticParams" error.)
export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return buildMetadata(params.locale, "/");
}

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(params.locale);
  return <RootDocument locale={params.locale}>{children}</RootDocument>;
}
