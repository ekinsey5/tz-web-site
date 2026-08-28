import Link from "next/link";
import {
  Bot,
  Coins,
  Gauge,
  Gift,
  Mail,
  PiggyBank,
  Scale,
  ShoppingCart,
  Snowflake,
  Wallet,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ARTICLES } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

/** Listing order + icon chip per article; copy comes from Learn.articles.<key>. */
const ARTICLE_CARDS: ReadonlyArray<{ key: keyof typeof ARTICLES; icon: LucideIcon }> = [
  { key: "aiFinancialCoach", icon: Bot },
  { key: "windfallInterceptor", icon: Gift },
  { key: "canIAffordThis", icon: ShoppingCart },
  { key: "payOffDebtFaster", icon: Scale },
  { key: "snowflakePayments", icon: Snowflake },
  { key: "catchOverspendingEarly", icon: Gauge },
  { key: "irregularPaycheck", icon: Coins },
  { key: "sinkingFunds", icon: PiggyBank },
  { key: "envelopeBudgeting", icon: Mail },
  { key: "firstBudget", icon: Wand2 },
  { key: "makingABudget", icon: Wallet },
];

/** Listing page for the /learn section, shared by the (en) and [locale] routes. */
export async function LearnIndexPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Learn" });

  return (
    <LearnPageChrome locale={locale}>
      <div className="container-tz max-w-prose py-12 sm:py-16">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lead text-body">{t("subheading")}</p>

        <ul className="mt-10 space-y-6">
          {ARTICLE_CARDS.map(({ key, icon: Icon }) => {
            const articleHref = localizePath(locale, ARTICLES[key].path);
            return (
              <li key={key}>
                <article className="card p-6">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand"
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="text-h3 text-ink-strong">
                      <Link href={articleHref} className="hover:text-brand">
                        {t(`articles.${key}.title`)}
                      </Link>
                    </h2>
                  </div>
                  <p className="mt-3 text-body">{t(`articles.${key}.excerpt`)}</p>
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
            );
          })}
        </ul>
      </div>
    </LearnPageChrome>
  );
}
