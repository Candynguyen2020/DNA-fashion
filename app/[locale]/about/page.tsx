import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("lead")} />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <PlaceholderImage label="Atelier — behind the scenes" className="aspect-[16/9] w-full" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <p className="text-base leading-relaxed text-ink">{t("body1")}</p>
          <p className="text-base leading-relaxed text-ink">{t("body2")}</p>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
            {t("valuesTitle")}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="text-base font-medium text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
