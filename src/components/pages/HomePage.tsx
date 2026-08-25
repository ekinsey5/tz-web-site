import { getFormatter, getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Spotlight } from "@/components/Spotlight";
import { StrategySimulator } from "@/components/StrategySimulator";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SPOTLIGHTS, BRAND, PRICING, SITE_URL } from "@/content/site";
import { SCREENSHOTS } from "@/content/assets";
import type { Locale } from "@/i18n/config";

const debtCrusher = SPOTLIGHTS.find((s) => s.id === "debt-crusher")!;
const insights = SPOTLIGHTS.find((s) => s.id === "insights")!;
const coach = SPOTLIGHTS.find((s) => s.id === "coach")!;

async function buildJsonLd(locale: Locale) {
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const tFaq = await getTranslations({ locale, namespace: "Faq" });
  const format = await getFormatter({ locale });
  const currency = (value: number) => format.number(value, { style: "currency", currency: "USD" });

  // The trial-pricing FAQ answer is a separate named key (not items[0]) — see
  // Faq.tsx for why: next-intl doesn't resolve numeric array-index dot-paths
  // like "items.0.a", so ICU interpolation needs an explicit key.
  const faqItems = [
    {
      q: tFaq("trialQuestion"),
      a: tFaq("trialAnswer", {
        monthlyPrice: currency(PRICING.monthly),
        annualPrice: currency(PRICING.annualPerYear),
        annualPerMonthPrice: currency(PRICING.annualPerMonth),
      }),
    },
    ...(tFaq.raw("items") as { q: string; a: string }[]),
  ];

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND.name,
    description: tMeta("description"),
    url: locale === "en" ? SITE_URL : `${SITE_URL}/${locale}/`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", name: "Monthly", price: PRICING.monthly, priceCurrency: "USD" },
      { "@type": "Offer", name: "Annual", price: PRICING.annualPerYear, priceCurrency: "USD" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return { softwareApplicationJsonLd, faqJsonLd };
}

export async function HomePage({ locale }: { locale: Locale }) {
  const { softwareApplicationJsonLd, faqJsonLd } = await buildJsonLd(locale);

  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Nav />
      <main id="main">
        <Hero locale={locale} />
        <HowItWorks locale={locale} />
        <Features locale={locale} />

        <Spotlight
          spotlight={debtCrusher}
          asset={SCREENSHOTS.debtCrusher}
          locale={locale}
          visual={<StrategySimulator />}
        />
        <Spotlight spotlight={insights} asset={SCREENSHOTS.insights} locale={locale} alt />
        <Spotlight spotlight={coach} asset={SCREENSHOTS.coach} locale={locale} />

        <ComparisonTable locale={locale} />
        <Pricing />
        <Faq />
        <FinalCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
