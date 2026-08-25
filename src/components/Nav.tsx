"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NAV_LINKS, APP_URLS, type NavLink } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/lib/locale-links";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "home",
  ...NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
    l.href.replace("#", ""),
  ),
];

export function Nav() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const homePath = localizePath(locale, "/");
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isHome = normalized === homePath;

  // On the homepage anchors scroll in place; elsewhere they lead back home.
  const hrefFor = (link: NavLink) =>
    link.href.startsWith("#")
      ? isHome
        ? link.href
        : `${homePath}${link.href}`
      : localizePath(locale, link.href);

  const isActiveLink = (link: NavLink) =>
    link.href.startsWith("#")
      ? isHome && active === link.href.replace("#", "")
      : normalized.startsWith(localizePath(locale, link.href));

  // Header shadow once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section nearest the top of the viewport
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-surface/90 backdrop-blur transition-shadow",
        scrolled ? "border-line shadow-tz-sm" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <nav
        aria-label={t("primaryAriaLabel")}
        className="container-tz flex h-16 items-center justify-between gap-4"
      >
        <a
          href={isHome ? "#home" : homePath}
          aria-label={t("homeAriaLabel")}
          className="rounded-lg"
        >
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link);
            return (
              <li key={link.href}>
                <a
                  href={hrefFor(link)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive ? "text-brand" : "text-body hover:text-ink-strong",
                  )}
                >
                  {t(`links.${link.id}`)}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={APP_URLS.login} className="btn-ghost text-sm font-medium">
            {t("logIn")}
          </a>
          <a href={APP_URLS.register} className="btn-primary btn-sm">
            {t("startFreeTrial")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-surface lg:hidden"
      >
        <div className="container-tz flex flex-col gap-1 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link);
              return (
                <li key={link.href}>
                  <a
                    href={hrefFor(link)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-brand-tint text-brand"
                        : "text-body hover:bg-subtle",
                    )}
                  >
                    {t(`links.${link.id}`)}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-col gap-3">
            <a
              href={APP_URLS.login}
              className="btn-secondary"
              onClick={() => setOpen(false)}
            >
              {t("logIn")}
            </a>
            <a
              href={APP_URLS.register}
              className="btn-primary"
              onClick={() => setOpen(false)}
            >
              {t("startFreeTrial")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
