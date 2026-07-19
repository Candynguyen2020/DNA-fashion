"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const navItems = [
  { href: "/women", key: "women" },
  { href: "/men", key: "men" },
  { href: "/collections", key: "collections" },
  { href: "/journal", key: "journal" },
  { href: "/booking", key: "booking" },
  { href: "/about", key: "about" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
          aria-label={tBrand("name")}
        >
          {tBrand("name")}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group relative text-[15px] text-ink"
            >
              {t(item.key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 text-[13px] tracking-[0.02em] sm:flex">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-border">/</span>}
                <Link
                  href={pathname}
                  locale={loc}
                  aria-current={locale === loc ? "true" : undefined}
                  className={
                    locale === loc
                      ? "text-ink"
                      : "text-muted-foreground hover:text-ink"
                  }
                >
                  {loc.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <Link
            href="/search"
            aria-label={t("search")}
            className="hidden h-11 w-11 items-center justify-center sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" />
              <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>

          <Link
            href="/account"
            aria-label={t("account")}
            className="flex h-11 w-11 items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M4 20c1.6-4 5-6 8-6s6.4 2 8 6"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </Link>

          <Link
            href="/cart"
            aria-label={t("cart")}
            className="flex h-11 w-11 items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 8h12l-1 12H7L6 8Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main mobile"
          className="border-t border-border px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center text-[15px] text-ink"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-3 border-t border-border pt-3">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-11 items-center text-[13px] tracking-[0.02em] ${
                    locale === loc ? "text-ink" : "text-muted-foreground"
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
