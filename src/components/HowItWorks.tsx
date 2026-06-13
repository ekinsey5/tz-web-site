import { HOW_IT_WORKS } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">How it works</p>
        <h2 id="how-it-works-title" className="mt-3 text-h2">
          {HOW_IT_WORKS.heading}
        </h2>
        <p className="mt-4 text-lead text-muted">{HOW_IT_WORKS.subheading}</p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <Reveal as="li" key={step.number} delay={i * 0.07} className="card p-6">
            <span
              aria-hidden
              className="tz-number grid h-10 w-10 place-items-center rounded-lg bg-brand-tint text-base font-bold text-brand"
            >
              {step.number}
            </span>
            <h3 className="mt-4 text-h3">
              <span className="sr-only">{`Step ${step.number}: `}</span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
