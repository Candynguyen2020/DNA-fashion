import { Link } from "@/i18n/navigation";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatVnd, type PlaceholderProduct } from "@/lib/placeholder-catalog";
import type { AppLocale } from "@/i18n/routing";

export function ProductCard({
  product,
  locale,
}: {
  product: PlaceholderProduct;
  locale: AppLocale;
}) {
  const name = locale === "vi" ? product.nameVi : product.nameEn;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden bg-muted">
        <PlaceholderImage
          label={name}
          src={product.images[0]}
          showLabel={false}
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-ink">{name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.material}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-ink">{formatVnd(product.price)}</p>
      </div>
    </Link>
  );
}
