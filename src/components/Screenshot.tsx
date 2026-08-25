import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ScreenshotAsset } from "@/content/assets";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

interface ScreenshotProps {
  asset: ScreenshotAsset;
  /** Translated alt text describing the image. */
  alt: string;
  /** Translated short label shown on the placeholder — required when asset.available is false. */
  label?: string;
  locale: Locale;
  /** Set on the hero image (above the fold) for LCP. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders a product screenshot inside a faux app frame. Falls back to a
 * branded placeholder (same aspect ratio) when the real asset isn't available
 * yet, so layout stays stable and the build stays clean.
 */
export async function Screenshot({ asset, alt, label, locale, priority, className }: ScreenshotProps) {
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
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder label={label ?? ""} alt={alt} locale={locale} />
        )}
      </div>
    </figure>
  );
}

async function Placeholder({ label, alt, locale }: { label: string; alt: string; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Assets" });
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
      <span className="text-xs text-muted">{t("productPreview")}</span>
    </div>
  );
}
