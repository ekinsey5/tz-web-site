import Link from "next/link";
import {
  Bot,
  Coins,
  Gauge,
  Gift,
  Landmark,
  Mail,
  PiggyBank,
  Scale,
  ShoppingCart,
  Snowflake,
  Tag,
  Target,
  Users,
  Wallet,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LearnPageChrome } from "@/components/LearnPageChrome";
import { ARTICLES, LEARN_JOURNEY } from "@/content/site";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

/** Icon chip per article; order and grouping come from LEARN_JOURNEY in site.ts. */
const ICONS: Record<keyof typeof ARTICLES, LucideIcon> = {
  makingABudget: Wallet,
  firstBudget: Wand2,
  envelopeBudgeting: Mail,
  sinkingFunds: PiggyBank,
  irregularPaycheck: Coins,
  catchOverspendingEarly: Gauge,
  payOffDebtFaster: Scale,
  snowflakePayments: Snowflake,
  canIAffordThis: ShoppingCart,
  windfallInterceptor: Gift,
  aiFinancialCoach: Bot,
  goalsAndDebt: Target,
  connectYourBank: Landmark,
  spendingTags: Tag,
  budgetWithPartner: Users,
};

/** Listing page for the /learn section, shared by the (en) and [locale] routes. */
export async function LearnIndexPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Learn" });

  return (
    <LearnPageChrome locale={locale}>
      <div className="container-tz py-12 sm:py-16">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-prose text-lead text-body">{t("subheading")}</p>

        {LEARN_JOURNEY.map(({ stage, articles }) => (
          <section key={stage} aria-labelledby={`stage-${stage}`} className="mt-12">
            <h2 id={`stage-${stage}`} className="text-2xl font-bold text-ink-strong">
              {t(`stages.${stage}`)}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((key) => {
                const Icon = ICONS[key];
                const articleHref = localizePath(locale, ARTICLES[key].path);
                return (
                  <li key={key}>
                    <article className="card flex h-full flex-col p-6">
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden
                          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand"
                        >
                          <Icon className="h-7 w-7" />
                        </span>
                        <h3 className="text-h3 text-ink-strong">
                          <Link href={articleHref} className="hover:text-brand">
                            {t(`articles.${key}.title`)}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-3 line-clamp-3 text-body">{t(`articles.${key}.excerpt`)}</p>
                      {/* Redundant with the title link; hidden from AT so each card
                          keeps a single accessible name and one tab stop. */}
                      <p className="mt-auto pt-4">
                        <Link
                          href={articleHref}
                          aria-hidden
                          tabIndex={-1}
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
          </section>
        ))}
      </div>
    </LearnPageChrome>
  );
}
