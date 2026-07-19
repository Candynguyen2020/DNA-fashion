import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { posts } from "@/lib/placeholder-journal";
import type { AppLocale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const loc = locale as AppLocale;

  const promises = [
    t("promise.materials"),
    t("promise.pricing"),
    t("promise.craft"),
    t("promise.returns"),
  ];

  return (
    <>
      <section className="relative flex min-h-[85vh] items-end border-b border-border">
        <PlaceholderImage
          label="Hero — lookbook photography"
          src="/images/hero.jpg"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.14em] uppercase text-white/80">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-md text-white/85">{t("heroSubtitle")}</p>
          <LinkButton
            href="/collections"
            variant="secondary"
            className="mt-8 border-white text-white hover:bg-white hover:text-ink"
          >
            {t("heroCta")}
          </LinkButton>
        </div>
      </section>

      <section className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {promises.map((claim, i) => (
            <p
              key={i}
              className="border-border text-sm text-ink md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              {claim}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-semibold tracking-tight">
          {t("categoriesTitle")}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <CategoryCard href="/women" label={t("categoryWomen")} src="/images/category/women.jpg" />
          <CategoryCard href="/men" label={t("categoryMen")} src="/images/category/men.jpg" />
        </div>
      </section>

      <section className="border-y border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {t("editorialTitle")}
            </h2>
            <Link
              href="/journal"
              className="hidden text-sm underline underline-offset-4 sm:block"
            >
              {t("editorialCta")}
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {posts.map((post) => {
              const title = loc === "vi" ? post.titleVi : post.titleEn;
              return (
                <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
                  <PlaceholderImage
                    label={title}
                    src={post.coverImage}
                    showLabel={false}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <h3 className="mt-4 text-base font-medium">{title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center gap-4 border border-border p-10">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {t("vipTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("vipSubtitle")}</p>
          <LinkButton href="/vip" variant="secondary" className="mt-2 w-fit">
            {t("vipCta")}
          </LinkButton>
        </div>
        <div className="flex flex-col justify-center gap-4 border border-border p-10">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {t("bookingTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("bookingSubtitle")}</p>
          <LinkButton href="/booking" variant="secondary" className="mt-2 w-fit">
            {t("bookingCta")}
          </LinkButton>
        </div>
      </section>
    </>
  );
}

function CategoryCard({ href, label, src }: { href: string; label: string; src: string }) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden">
        <PlaceholderImage
          label={label}
          src={src}
          showLabel={false}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <span className="mt-4 flex items-center justify-between border-b border-transparent pb-1 text-base text-ink transition-colors group-hover:border-ink">
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
    </Link>
  );
}
