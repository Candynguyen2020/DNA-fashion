import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductCard } from "@/components/storefront/product-card";
import { getProductsByGender } from "@/lib/placeholder-catalog";
import type { AppLocale } from "@/i18n/routing";

export default async function MenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("category");
  const products = getProductsByGender("men");

  return (
    <>
      <PageHero title={t("menTitle")} intro={t("menIntro")} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale as AppLocale} />
          ))}
        </div>
      </div>
    </>
  );
}
