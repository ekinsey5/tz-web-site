import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { inter } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/config";
import "@/app/globals.css";

/** Shared <html>/<body> shell for both root layouts ((en) and [locale]). */
export async function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale });
  const orgJsonLd = await organizationJsonLd(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd data={orgJsonLd} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
