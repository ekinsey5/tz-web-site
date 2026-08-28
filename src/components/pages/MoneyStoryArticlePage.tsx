import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Compass,
  Hourglass,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ArticleCta } from "@/components/ArticleCta";
import { APP_URLS, ARTICLES, BRAND, LEARN_PATH, SITE_URL } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

const ARTICLE = ARTICLES.moneyStory;

const P_CLASS = "mt-5 leading-relaxed text-body";

/** Every section is uniform: one h2 plus prose paragraphs. */
const SECTIONS = [
  { key: "whereTheStoryLives", paragraphs: 2, icon: Compass },
  { key: "netWorthChapter", paragraphs: 2, icon: TrendingUp },
  { key: "ageOfMoneyChapter", paragraphs: 2, icon: Hourglass },
  { key: "incomeVsExpenseChapter", paragraphs: 2, icon: BarChart3 },
  { key: "readingItTogether", paragraphs: 2, icon: BookOpen },
  { key: "fromStoryToNextChapter", paragraphs: 2, icon: Sparkles },
] as const;

/** Section h2 with a tinted icon chip, matching the homepage feature cards. */
function SectionHeading({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="mt-12 flex items-center gap-4 border-t border-ink/10 pt-8">
      <span
        aria-hidden
        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand"
      >
        <Icon className="h-7 w-7" />
      </span>
      <h2 className="text-2xl font-bold text-ink-strong">{children}</h2>
    </div>
  );
}

/** "Reading Your Money Story" article, shared by the (en) and [locale] routes. */
export async function MoneyStoryArticlePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Articles.moneyStory" });
  const tLearn = await getTranslations({ locale, namespace: "Learn" });

  const coachHref = localizePath(locale, ARTICLES.aiFinancialCoach.path);
  const paceHref = localizePath(locale, ARTICLES.catchOverspendingEarly.path);
  const rich = (key: string) =>
    t.rich(key, {
      strong: (chunks) => <strong className="font-semibold text-ink-strong">{chunks}</strong>,
      em: (chunks) => <em>{chunks}</em>,
      link: (chunks) => (
        <Link href={coachHref} className="font-medium text-brand hover:underline">
          {chunks}
        </Link>
      ),
      link2: (chunks) => (
        <Link href={paceHref} className="font-medium text-brand hover:underline">
          {chunks}
        </Link>
      ),
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

          {SECTIONS.map(({ key, paragraphs, icon }) => (
            <section key={key}>
              <SectionHeading icon={icon}>{t(`${key}.heading`)}</SectionHeading>
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
        </article>
      </LearnPageChrome>
    </>
  );
}
