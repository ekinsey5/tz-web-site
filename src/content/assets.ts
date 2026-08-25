/**
 * Screenshot asset registry.
 *
 * `available` is flipped to true once a real image has been fetched into
 * /public/screenshots (e.g. via the Figma MCP). When false, the <Screenshot>
 * component renders a branded placeholder of the same aspect ratio so the
 * layout is stable and the build is clean even before assets land.
 *
 * `alt`/`label` are NOT stored here — they're translated copy and are read
 * from messages.Hero.imageAlt / messages.Spotlights.<id>.imageAlt /
 * messages.Assets.* by the consuming component at render time.
 */
import { HERO, SPOTLIGHTS } from "@/content/site";

export interface ScreenshotAsset {
  src: string;
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
    src: HERO.imageSrc,
    available: true,
    ratio: "1579 / 880",
  },
  // Not rendered (the #debt-crusher spotlight uses the interactive simulator),
  // kept here for completeness.
  debtCrusher: {
    src: spot("debt-crusher").image.src,
    available: false,
    ratio: "4 / 3",
  },
  insights: {
    src: spot("insights").image.src,
    available: true,
    ratio: "1440 / 900",
  },
  coach: {
    src: spot("coach").image.src,
    available: true,
    ratio: "480 / 900",
    maxW: "max-w-[340px]",
  },
};
