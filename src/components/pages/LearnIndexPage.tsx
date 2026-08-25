import Link from "next/link";
import { Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ARTICLES } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

/** Listing page for the /learn section, shared by the (en) and [locale] routes. */
export async function LearnIndexPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Learn" });
  const articleHref = localizePath(locale, ARTICLES.makingABudget.path);

  return (
    <LearnPageChrome locale={locale}>
      <div className="container-tz max-w-prose py-12 sm:py-16">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lead text-body">{t("subheading")}</p>

        <ul className="mt-10 space-y-6">
          <li>
            <article className="card p-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand"
                >
                  <Wallet className="h-7 w-7" />
                </span>
                <h2 className="text-h3 text-ink-strong">
                  <Link href={articleHref} className="hover:text-brand">
                    {t("articles.makingABudget.title")}
                  </Link>
                </h2>
              </div>
              <p className="mt-3 text-body">{t("articles.makingABudget.excerpt")}</p>
              <p className="mt-4">
                <Link
                  href={articleHref}
                  className="text-sm font-medium text-brand hover:underline"
                >
                  {t("readArticle")}
                  <span aria-hidden="true"> →</span>
                </Link>
              </p>
            </article>
          </li>
        </ul>
      </div>
    </LearnPageChrome>
  );
}
