import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ArticleCta } from "@/components/ArticleCta";
import { APP_URLS, ARTICLES, BRAND, LEARN_PATH, LEARN_JOURNEY, SITE_URL } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

const ARTICLE = ARTICLES.budgetJourney;

const P_CLASS = "mt-5 leading-relaxed text-body";

/** The journey without this article's own stage — the map doesn't chart itself. */
const PATH_STAGES = LEARN_JOURNEY.filter((s) => s.stage !== "theMap");

/**
 * "The Budget Journey" map article, shared by the (en) and [locale] routes.
 * Unlike the prose articles, its core is a diagram of the whole /learn path,
 * rendered from LEARN_JOURNEY and the existing card titles so the diagram can
 * never drift from the real order.
 */
export async function BudgetJourneyArticlePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Articles.budgetJourney" });
  const tLearn = await getTranslations({ locale, namespace: "Learn" });

  const rich = (key: string) =>
    t.rich(key, {
      strong: (chunks) => <strong className="font-semibold text-ink-strong">{chunks}</strong>,
      em: (chunks) => <em>{chunks}</em>,
    });

  const pageUrl = `${SITE_URL}${localizePath(locale, ARTICLE.path)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("title"),
    description: t("meta.description"),
    inLanguage: locale,
    datePublished: ARTICLE.datePublished,
    dateModified: ARTICLE.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    image: `${SITE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: BRAND.company, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-mark.svg` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tLearn("breadcrumbHome"),
        item: `${SITE_URL}${localizePath(locale, "/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tLearn("eyebrow"),
        item: `${SITE_URL}${localizePath(locale, LEARN_PATH)}`,
      },
      { "@type": "ListItem", position: 3, name: t("title"), item: pageUrl },
    ],
  };

  let step = 0;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <LearnPageChrome locale={locale}>
        <article className="container-tz max-w-prose py-12 sm:py-16">
          <p className="eyebrow">{tLearn("eyebrow")}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {t("title")}
          </h1>
          <p className={P_CLASS}>{rich("intro.p1")}</p>
          <p className={P_CLASS}>{rich("intro.p2")}</p>

          {/* The journey diagram: a continuous spine through six stages. */}
          <div className="relative mt-12" role="list" aria-label={t("diagramLabel")}>
            <div aria-hidden className="absolute bottom-4 left-[21px] top-4 w-0.5 bg-brand/20" />
            {PATH_STAGES.map(({ stage, articles }, stageIndex) => (
              <section key={stage} className="relative pt-8 first:pt-0">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white"
                  >
                    {stageIndex + 1}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-ink-strong">
                      {tLearn(`stages.${stage}`)}
                    </h2>
                    <p className="text-sm text-body">{t(`stageNotes.${stage}`)}</p>
                  </div>
                </div>
                <ol className="mt-2">
                  {articles.map((key) => {
                    step += 1;
                    return (
                      <li key={key} className="flex items-center gap-4 py-2" role="listitem">
                        <span
                          aria-hidden
                          className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center"
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-brand-tint text-sm font-bold text-brand">
                            {step}
                          </span>
                        </span>
                        <p className="text-[15px] font-medium">
                          <span className="sr-only">{tLearn("step", { number: step })}: </span>
                          <Link
                            href={localizePath(locale, ARTICLES[key].path)}
                            className="text-ink-strong hover:text-brand hover:underline"
                          >
                            {tLearn(`articles.${key}.title`)}
                          </Link>
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>

          <p className={P_CLASS.replace("mt-5", "mt-10")}>{rich("outro.p1")}</p>

          <ArticleCta
            heading={t("cta.heading")}
            body={t("cta.body")}
            buttonLabel={t("cta.button")}
            href={APP_URLS.register}
          />
        </article>
      </LearnPageChrome>
    </>
  );
}
