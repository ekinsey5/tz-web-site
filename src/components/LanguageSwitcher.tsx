"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { LOCALES } from "@/i18n/config";
import { currentLocaleFromPathname, localizedHref } from "@/lib/locale-links";
import { cn } from "@/lib/utils";

/**
 * Sets the tz_locale cookie so a visitor's explicit choice sticks — this is
 * the only way to make it "stick" for an English-preferring visitor, since
 * the CloudFront edge redirect can only set cookies on its own synthetic
 * redirect response, never on a passthrough request (see
 * docs/infra/deployment-plan.md).
 */
function persistLocaleChoice(locale: string) {
  document.cookie = `tz_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

interface LanguageSwitcherProps {
  className?: string;
  /** "dark" for use on dark backgrounds (e.g. the footer). */
  variant?: "light" | "dark";
}

export function LanguageSwitcher({ className, variant = "light" }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const current = currentLocaleFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors duration-150",
          variant === "dark"
            ? "text-white/70 hover:text-white"
            : "text-muted hover:text-ink-strong",
        )}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden />
        {t(current)}
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-150", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t("label")}
          className="absolute right-0 z-10 mt-1 min-w-[8rem] overflow-hidden rounded-lg border border-line bg-surface py-1 shadow-tz-md"
        >
          {LOCALES.map((locale) => {
            const isActive = locale === current;
            return (
              <li key={locale} role="none">
                <a
                  role="menuitem"
                  href={localizedHref(locale, pathname)}
                  hrefLang={locale}
                  onClick={() => {
                    persistLocaleChoice(locale);
                    setOpen(false);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block px-3 py-2 text-sm transition-colors duration-150",
                    isActive ? "bg-brand-tint text-brand" : "text-body hover:bg-subtle",
                  )}
                >
                  {t(locale)}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
