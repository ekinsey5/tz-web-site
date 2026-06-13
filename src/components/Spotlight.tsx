import { Check } from "lucide-react";
import type { Spotlight as SpotlightData } from "@/content/site";
import type { ScreenshotAsset } from "@/content/assets";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Screenshot } from "./Screenshot";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  spotlight: SpotlightData;
  asset: ScreenshotAsset;
  /** Optional custom visual (e.g. the interactive simulator) replacing the screenshot. */
  visual?: React.ReactNode;
  alt?: boolean;
}

export function Spotlight({ spotlight, asset, visual, alt }: SpotlightProps) {
  const imageFirst = spotlight.imageSide === "left";
  const titleId = `${spotlight.id}-title`;

  return (
    <Section id={spotlight.id} alt={alt} aria-labelledby={titleId}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className={cn("min-w-0", imageFirst ? "lg:order-1" : "lg:order-2")}>
          {visual ?? <Screenshot asset={asset} />}
        </Reveal>

        <div className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}>
          <p className="eyebrow">{spotlight.eyebrow}</p>
          <h2 id={titleId} className="mt-3 text-h2">
            {spotlight.heading}
          </h2>
          <p className="mt-4 text-lead text-body">{spotlight.body}</p>
          <ul className="mt-6 space-y-3">
            {spotlight.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-body">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
