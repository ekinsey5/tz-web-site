import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/Logo";
import { Markdown } from "@/components/Markdown";
import { Footer } from "@/components/Footer";
import { LEGAL_LAST_UPDATED } from "@/content/legal";

/**
 * Shared chrome for the Privacy Policy and Terms of Service pages. These
 * pages are English-only at every locale (see docs/i18n/gaps-and-recommendations.md)
 * — only the surrounding chrome (back link, "Last Updated" label) is translated.
 */
export async function LegalPageLayout({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  const t = await getTranslations({ locale: "en", namespace: "LegalPageLayout" });

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-tz flex h-16 items-center justify-between">
          <Link href="/" aria-label={t("homeAriaLabel")}>
            <Logo />
          </Link>
          <Link href="/" className="text-sm font-medium text-brand hover:underline">
            {t("backToHome")}
          </Link>
        </div>
      </header>

      <main className="bg-page">
        <article className="container-tz max-w-prose py-12 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {t("lastUpdated", { date: LEGAL_LAST_UPDATED })}
          </p>
          <div className="mt-8">
            <Markdown source={source} />
          </div>
        </article>
      </main>

      <Footer locale="en" />
    </>
  );
}
