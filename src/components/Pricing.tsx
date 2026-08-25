"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { PRICING, PRICING_URLS } from "@/content/site";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

function FeatureList({ features }: { features: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-body">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
            strokeWidth={3}
            aria-hidden
          />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  const t = useTranslations("Pricing");
  const format = useFormatter();
  const [billing, setBilling] = useState<Billing>("annual");
  const isAnnual = billing === "annual";

  const perMonth = isAnnual ? PRICING.annualPerMonth : PRICING.monthly;
  const currency = (value: number) => format.number(value, { style: "currency", currency: "USD" });

  const trial = t.raw("trial") as { name: string; badge: string; priceLabel: string; description: string; features: string[]; cta: string };
  const premium = t.raw("premium") as { name: string; badge: string; description: string; features: string[]; cta: string };

  return (
    <Section id="pricing" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 id="pricing-title" className="mt-3 text-h2">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lead text-muted">{t("subheading")}</p>
      </div>

      {/* Billing toggle */}
      <div className="mt-8 flex items-center justify-center">
        <div
          role="group"
          aria-label={t("billingPeriodAriaLabel")}
          className="inline-grid grid-cols-2 gap-1 rounded-lg border border-line bg-surface p-1"
        >
          <button
            type="button"
            aria-pressed={!isAnnual}
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              !isAnnual ? "bg-brand text-white" : "text-body hover:text-ink-strong",
            )}
          >
            {t("monthly")}
          </button>
          <button
            type="button"
            aria-pressed={isAnnual}
            onClick={() => setBilling("annual")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              isAnnual ? "bg-brand text-white" : "text-body hover:text-ink-strong",
            )}
          >
            {t("annual")}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-semibold",
                isAnnual ? "bg-white/20 text-white" : "bg-success-bg text-success-strong",
              )}
            >
              {t("save", { percent: PRICING.annualSavingsPercent })}
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Free trial */}
        <div className="card flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <h3 className="text-h3">{trial.name}</h3>
            <span className="rounded-full bg-subtle px-2.5 py-0.5 text-xs font-medium text-muted">
              {trial.badge}
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="tz-number text-4xl font-bold text-ink-strong">
              {trial.priceLabel}
            </span>
            <span className="text-sm text-muted">
              {t("trialCadence", { days: PRICING.trialDays })}
            </span>
          </div>
          <p className="mt-3 text-sm text-body">{trial.description}</p>
          <FeatureList features={trial.features} />
          <a href={PRICING_URLS.trialCtaHref} className="btn-secondary mt-8 w-full">
            {trial.cta}
          </a>
        </div>

        {/* Premium */}
        <div className="card relative flex flex-col border-brand p-6 shadow-tz-md ring-1 ring-brand sm:p-8">
          <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            {premium.badge}
          </span>
          <h3 className="text-h3">{premium.name}</h3>

          <div aria-live="polite" className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="tz-number text-4xl font-bold text-ink-strong">
                {currency(perMonth)}
              </span>
              <span className="text-sm text-muted">{t("perMonth")}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {isAnnual
                ? t("billedAnnually", {
                    price: currency(PRICING.annualPerYear),
                    amount: currency(PRICING.annualSavingsPerYear),
                  })
                : t("billedMonthly", { price: currency(PRICING.monthlyAnnualized) })}
            </p>
          </div>

          <p className="mt-3 text-sm text-body">{premium.description}</p>
          <FeatureList features={premium.features} />
          <a href={PRICING_URLS.premiumCtaHref} className="btn-primary mt-8 w-full">
            {premium.cta}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-muted">
        {t("note")} {t("trialNote", { days: PRICING.trialDays })}
      </p>
    </Section>
  );
}
