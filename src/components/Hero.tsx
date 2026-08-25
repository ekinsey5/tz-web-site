import { ArrowRight, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HERO } from "@/content/site";
import { SCREENSHOTS } from "@/content/assets";
import { Reveal } from "./Reveal";
import { Screenshot } from "./Screenshot";
import type { Locale } from "@/i18n/config";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const trust = t.raw("trust") as string[];

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-tint/50 to-page"
    >
      <div className="container-tz grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-4 text-display text-ink-strong">{t("heading")}</h1>
          <p className="mt-5 max-w-prose text-lead text-body">
            {t("subheading")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={HERO.primaryCtaHref} className="btn-primary">
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={HERO.secondaryCtaHref} className="btn-secondary">
              {t("secondaryCta")}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 text-sm text-muted"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <Screenshot asset={SCREENSHOTS.hero} alt={t("imageAlt")} locale={locale} priority />
        </Reveal>
      </div>
    </section>
  );
}
