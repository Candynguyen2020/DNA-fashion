import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import {
  products,
  getProductBySlug,
  formatVnd,
} from "@/lib/placeholder-catalog";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const SIZES = ["S", "M", "L", "XL"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("product");
  const loc = locale as AppLocale;

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const name = loc === "vi" ? product.nameVi : product.nameEn;
  const desc = loc === "vi" ? product.descVi : product.descEn;
  const related = products
    .filter((p) => p.slug !== product.slug && p.gender === product.gender)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3">
          <PlaceholderImage
            label={`${name} — 1`}
            src={product.images[0]}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="col-span-2 aspect-[4/5] w-full"
          />
          <PlaceholderImage
            label={`${name} — 2`}
            src={product.images[1]}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="aspect-square w-full"
          />
          <PlaceholderImage
            label={`${name} — 3`}
            src={product.images[2]}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="aspect-square w-full"
          />
        </div>

        <div className="lg:pt-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {name}
          </h1>
          <p className="mt-2 text-xl text-ink">{formatVnd(product.price)}</p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("materialLabel")}
            </p>
            <p className="mt-1 text-sm text-ink">{product.material}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("sizeLabel")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="flex h-11 min-w-11 items-center justify-center border border-border px-3 text-sm text-ink hover:border-ink"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" className="mt-8 w-full sm:w-auto">
            {t("addToCart")}
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">{t("shippingNote")}</p>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("descriptionTitle")}
            </p>
            <p className="mt-2 text-sm text-ink">{desc}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-border pt-14">
          <h2 className="text-lg text-ink">{t("relatedTitle")}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={loc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
