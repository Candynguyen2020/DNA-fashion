import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/storefront/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { collections } from "@/lib/placeholder-catalog";
import type { AppLocale } from "@/i18n/routing";

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collections");
  const loc = locale as AppLocale;

  return (
    <>
      <PageHero title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          {collections.map((collection) => {
            const name = loc === "vi" ? collection.nameVi : collection.nameEn;
            const desc = loc === "vi" ? collection.descVi : collection.descEn;
            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <PlaceholderImage
                  label={name}
                  showLabel={false}
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <h2 className="mt-4 text-lg text-ink">{name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                <span className="mt-3 inline-block text-sm text-ink underline underline-offset-4">
                  {t("viewCollection")}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
