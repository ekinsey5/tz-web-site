import Image from "next/image";
import type { ScreenshotAsset } from "@/content/assets";
import { cn } from "@/lib/utils";

interface ScreenshotProps {
  asset: ScreenshotAsset;
  /** Set on the hero image (above the fold) for LCP. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders a product screenshot inside a faux app frame. Falls back to a
 * branded placeholder (same aspect ratio) when the real asset isn't available
 * yet, so layout stays stable and the build stays clean.
 */
export function Screenshot({ asset, priority, className }: ScreenshotProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-tz-lg",
        asset.maxW && `${asset.maxW} mx-auto`,
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-subtle px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-strong" />
      </div>

      <div className="relative w-full" style={{ aspectRatio: asset.ratio }}>
        {asset.available ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder label={asset.label} alt={asset.alt} />
        )}
      </div>
    </figure>
  );
}

function Placeholder({ label, alt }: { label: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-tint via-surface to-info-bg p-6 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-base font-bold text-white">
        TZ
      </span>
      <span className="text-sm font-semibold text-ink-strong">{label}</span>
      <span className="text-xs text-muted">Product preview</span>
    </div>
  );
}
