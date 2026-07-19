import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductCard } from "@/components/storefront/product-card";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/placeholder-catalog";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collections");
  const loc = locale as AppLocale;

  const collection = getCollectionBySlug(slug);
  if (!collection) {
    notFound();
  }

  const name = loc === "vi" ? collection.nameVi : collection.nameEn;
  const desc = loc === "vi" ? collection.descVi : collection.descEn;
  const products = getProductsByCollection(slug);

  return (
    <>
      <PageHero eyebrow={t("title")} title={name} intro={desc || t("detailIntro")} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={loc} />
          ))}
        </div>
        <Link
          href="/collections"
          className="mt-14 inline-block text-sm text-ink underline underline-offset-4"
        >
          {t("backToCollections")}
        </Link>
      </div>
    </>
  );
}
