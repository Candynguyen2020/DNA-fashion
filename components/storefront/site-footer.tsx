import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");

  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">{t("newsletterTitle")}</h2>
            <p className="mt-3 max-w-sm text-sm text-white/70">{t("newsletterSubtitle")}</p>
            <form className="mt-5 flex max-w-sm border border-white/30">
              <label htmlFor="footer-email" className="sr-only">
                {t("newsletterPlaceholder")}
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder={t("newsletterPlaceholder")}
                className="min-h-11 flex-1 bg-transparent px-4 text-sm placeholder:text-white/50 focus:outline-none"
              />
              <Button type="submit" variant="ghost" className="px-5 text-white no-underline">
                {t("newsletterCta")}
              </Button>
            </form>
          </div>

          <FooterColumn title={t("shop")}>
            <FooterLink href="/women">{tNav("women")}</FooterLink>
            <FooterLink href="/men">{tNav("men")}</FooterLink>
            <FooterLink href="/collections">{tNav("collections")}</FooterLink>
            <FooterLink href="/vip">{tNav("vip")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("company")}>
            <FooterLink href="/about">{tNav("about")}</FooterLink>
            <FooterLink href="/journal">{tNav("journal")}</FooterLink>
            <FooterLink href="/booking">{tNav("booking")}</FooterLink>
            <FooterLink href="/contact">{tNav("contact")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("legal")}>
            <FooterLink href="/legal/terms">{t("terms")}</FooterLink>
            <FooterLink href="/legal/privacy">{t("privacy")}</FooterLink>
            <FooterLink href="/legal/returns">{t("returns")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-xs tracking-[0.04em] text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {tBrand("name")}. {t("copyright")}
          </p>
          <p>
            [Company legal name, address &amp; tax code placeholder — to be confirmed
            before launch]
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.04em] uppercase text-white/80">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/70 hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
