import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Button } from "@/components/ui/button";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <PlaceholderImage
          label="Private styling consultation"
          src="/images/accent/booking.jpg"
          showLabel={false}
          className="aspect-[4/5] w-full lg:sticky lg:top-24 lg:h-fit"
        />
        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="booking-name" label={t("nameLabel")} type="text" />
            <Field id="booking-phone" label={t("phoneLabel")} type="tel" />
          </div>
          <Field id="booking-email" label={t("emailLabel")} type="email" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="booking-date" label={t("dateLabel")} type="date" />
            <Field id="booking-time" label={t("timeLabel")} type="time" />
          </div>
          <div>
            <label htmlFor="booking-notes" className="text-sm text-ink">
              {t("notesLabel")}
            </label>
            <textarea
              id="booking-notes"
              rows={4}
              className="mt-2 w-full border border-border px-4 py-3 text-sm focus:border-ink focus:outline-none"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            {t("submit")}
          </Button>
          <p className="text-xs text-muted-foreground">{t("confirmNote")}</p>
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
