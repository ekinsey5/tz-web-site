import { getTranslations } from "next-intl/server";
import { FEATURE_ICONS } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { FeatureCard } from "./FeatureCard";
import type { Locale } from "@/i18n/config";

export async function Features({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Features" });
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <Section id="features" alt aria-labelledby="features-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 id="features-title" className="mt-3 text-h2">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lead text-muted">{t("subheading")}</p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((feature, i) => (
          <Reveal as="li" key={feature.title} delay={(i % 3) * 0.06}>
            <FeatureCard icon={FEATURE_ICONS[i]} title={feature.title} body={feature.body} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
