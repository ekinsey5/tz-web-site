import { getTranslations } from "next-intl/server";
import { NAV_LINKS, FOOTER_LINKS, APP_URLS, BRAND } from "@/content/site";
import { SmsDisclosure } from "@/components/SmsDisclosure";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { localizePath } from "@/lib/locale-links";
import type { Locale } from "@/i18n/config";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });

  return (
    <footer className="bg-ink-strong text-white/80">
      <div className="container-tz py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-full-inverse.svg"
              alt={BRAND.name}
              width={1862}
              height={468}
              className="h-[34px] w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t("tagline")}
            </p>
          </div>

          <nav aria-label={t("footerAriaLabel")} className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                {t("product")}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={
                        link.href.startsWith("#")
                          ? `${localizePath(locale, "/")}${link.href}`
                          : localizePath(locale, link.href)
                      }
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {tNav(`links.${link.id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                {t("company")}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={
                        "localized" in link && link.localized
                          ? localizePath(locale, link.href)
                          : link.href
                      }
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {t(`links.${link.id}`)}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={APP_URLS.login}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {t("logIn")}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <SmsDisclosure className="max-w-3xl" />
          <div className="mt-6 flex flex-col gap-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p>{t("copyright", { year: BRAND.year, company: BRAND.company })}</p>
              <p>{t("attribution", { name: BRAND.name, company: BRAND.company })}</p>
            </div>
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
