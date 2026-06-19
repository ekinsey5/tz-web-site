import { FOOTER, NAV_LINKS, APP_URLS } from "@/content/site";
import { SmsDisclosure } from "@/components/SmsDisclosure";

export function Footer() {
  return (
    <footer className="bg-ink-strong text-white/80">
      <div className="container-tz py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-[15px] font-bold leading-none text-white"
              >
                TZ
              </span>
              <span className="text-lg font-bold text-white">Tether-Zero</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {FOOTER.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Product
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Company
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {FOOTER.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={APP_URLS.login}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    Log in
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <SmsDisclosure className="max-w-3xl" />
          <div className="mt-6 flex flex-col gap-2 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>{FOOTER.copyright}</p>
            <p>{FOOTER.attribution}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
