import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { Button } from "@/components/ui/button";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} intro={t("intro")} />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("emailUs")}
            </p>
            <p className="mt-1 text-ink">hello@maisondna.com</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("callUs")}
            </p>
            <p className="mt-1 text-ink">+84 (0) 28 000 0000</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("visitUs")}
            </p>
            <p className="mt-1 text-ink">[Showroom address placeholder], TP. Hồ Chí Minh</p>
          </div>
        </div>

        <form className="space-y-5">
          <Field id="contact-name" label={t("nameLabel")} type="text" />
          <Field id="contact-email" label={t("emailLabel")} type="email" />
          <div>
            <label htmlFor="contact-message" className="text-sm text-ink">
              {t("messageLabel")}
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              className="mt-2 w-full border border-border px-4 py-3 text-sm focus:border-ink focus:outline-none"
            />
          </div>
          <Button type="submit" variant="primary">
            {t("submit")}
          </Button>
        </form>
      </div>
    </>
  );
}

function Field({ id, label, type }: { id: string; label: string; type: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="mt-2 min-h-11 w-full border border-border px-4 text-sm focus:border-ink focus:outline-none"
      />
    </div>
  );
}
