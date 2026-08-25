import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ArticleCta } from "@/components/ArticleCta";
import { APP_URLS, ARTICLES, BRAND, LEARN_PATH, SITE_URL } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

const ARTICLE = ARTICLES.makingABudget;

const H2_CLASS = "mt-12 border-t border-ink/10 pt-8 text-2xl font-bold text-ink-strong";
const P_CLASS = "mt-5 leading-relaxed text-body";

/**
 * Uniform sections rendered as one h2 plus paragraphs; step 4 carries an
 * ordered list, so it's written out by hand between these two groups.
 */
const SECTIONS_BEFORE_STEP4 = [
  { key: "whatIsABudget", paragraphs: 3 },
  { key: "gettingReady", paragraphs: 3 },
  { key: "step1", paragraphs: 3 },
  { key: "step2", paragraphs: 3 },
  { key: "step3", paragraphs: 3 },
] as const;

const SECTIONS_AFTER_STEP4 = [
  { key: "savings", paragraphs: 1 },
  { key: "finalThoughts", paragraphs: 2 },
] as const;

const STEP4_ITEMS = ["li1", "li2", "li3", "li4"] as const;

/** "How to Make a Budget" article, shared by the (en) and [locale] routes. */
export async function MakingABudgetArticlePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Articles.makingABudget" });
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

          {SECTIONS_BEFORE_STEP4.map(({ key, paragraphs }) => (
            <section key={key}>
              <h2 className={H2_CLASS}>{t(`${key}.heading`)}</h2>
              {Array.from({ length: paragraphs }, (_, i) => (
                <p key={i} className={P_CLASS}>
                  {rich(`${key}.p${i + 1}`)}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className={H2_CLASS}>{t("step4.heading")}</h2>
            <p className={P_CLASS}>{rich("step4.intro")}</p>
            <ol className="mt-5 list-decimal space-y-3 pl-6">
              {STEP4_ITEMS.map((item) => (
                <li key={item} className="leading-relaxed text-body">
                  {rich(`step4.${item}`)}
                </li>
              ))}
            </ol>
            <p className={P_CLASS}>{rich("step4.partner")}</p>
          </section>

          {SECTIONS_AFTER_STEP4.map(({ key, paragraphs }) => (
            <section key={key}>
              <h2 className={H2_CLASS}>{t(`${key}.heading`)}</h2>
              {Array.from({ length: paragraphs }, (_, i) => (
                <p key={i} className={P_CLASS}>
                  {rich(`${key}.p${i + 1}`)}
                </p>
              ))}
            </section>
          ))}

          <ArticleCta
            heading={t("cta.heading")}
            body={t("cta.body")}
            buttonLabel={t("cta.button")}
            href={APP_URLS.register}
          />

          <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
            {t.rich("attribution", {
              link: (chunks) => (
                <a
                  href={ARTICLE.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-ink-strong"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </article>
      </LearnPageChrome>
    </>
  );
}
