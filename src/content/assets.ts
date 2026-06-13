/**
 * Screenshot asset registry.
 *
 * `available` is flipped to true once a real image has been fetched into
 * /public/screenshots (e.g. via the Figma MCP). When false, the <Screenshot>
 * component renders a branded placeholder of the same aspect ratio so the
 * layout is stable and the build is clean even before assets land.
 */
import { HERO, SPOTLIGHTS } from "@/content/site";

export interface ScreenshotAsset {
  src: string;
  alt: string;
  /** Short label shown on the placeholder until the real image is supplied. */
  label: string;
  available: boolean;
  /** CSS aspect-ratio value, e.g. "16 / 10". */
  ratio: string;
  /** Optional max-width utility for portrait frames (centered). */
  maxW?: string;
}

const spot = (id: string) => SPOTLIGHTS.find((s) => s.id === id)!;

export const SCREENSHOTS: Record<
  "hero" | "debtCrusher" | "insights" | "coach",
  ScreenshotAsset
> = {
  hero: {
    src: HERO.image.src,
    alt: HERO.image.alt,
    label: "Debt Crusher dashboard",
    available: true,
    ratio: "1579 / 880",
  },
  // Not rendered (the #debt-crusher spotlight uses the interactive simulator),
  // kept here for completeness.
  debtCrusher: {
    src: spot("debt-crusher").image.src,
    alt: spot("debt-crusher").image.alt,
    label: "Debt Crusher Engine",
    available: false,
    ratio: "4 / 3",
  },
  insights: {
    src: spot("insights").image.src,
    alt: spot("insights").image.alt,
    label: "Freedom Dashboard & Insights",
    available: true,
    ratio: "1440 / 900",
  },
  coach: {
    src: spot("coach").image.src,
    alt: spot("coach").image.alt,
    label: "Zero — AI money coach",
    available: true,
    ratio: "480 / 900",
    maxW: "max-w-[340px]",
  },
};
