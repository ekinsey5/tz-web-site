import { FEATURES } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  return (
    <Section id="features" alt aria-labelledby="features-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Capabilities</p>
        <h2 id="features-title" className="mt-3 text-h2">
          {FEATURES.heading}
        </h2>
        <p className="mt-4 text-lead text-muted">{FEATURES.subheading}</p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.items.map((feature, i) => (
          <Reveal as="li" key={feature.title} delay={(i % 3) * 0.06}>
            <FeatureCard feature={feature} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
