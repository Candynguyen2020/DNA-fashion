import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <section className="relative flex min-h-[90vh] items-end border-b border-border">
        <PlaceholderImage
          label="Hero — lookbook photography"
          className="absolute inset-0 -z-10"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-sm tracking-[0.2em] uppercase text-white/80">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-white sm:text-6xl">
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl">{t("categoriesTitle")}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <CategoryCard href="/women" label={t("categoryWomen")} />
          <CategoryCard href="/men" label={t("categoryMen")} />
        </div>
      </section>

      <section className="border-y border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl">{t("editorialTitle")}</h2>
            <Link
              href="/journal"
              className="hidden text-sm uppercase tracking-[0.06em] underline underline-offset-4 sm:block"
            >
              {t("editorialCta")}
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article key={i}>
                <PlaceholderImage
                  label={`Journal cover ${i}`}
                  className="aspect-[4/5] w-full"
                />
                <h3 className="mt-4 font-display text-lg">
                  Editorial story placeholder {i}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center gap-4 border border-border p-10">
          <h2 className="font-display text-2xl">{t("vipTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("vipSubtitle")}</p>
          <LinkButton href="/vip" variant="secondary" className="mt-2 w-fit">
            {t("vipCta")}
          </LinkButton>
        </div>
        <div className="flex flex-col justify-center gap-4 border border-border p-10">
          <h2 className="font-display text-2xl">{t("bookingTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("bookingSubtitle")}</p>
          <LinkButton href="/booking" variant="secondary" className="mt-2 w-fit">
            {t("bookingCta")}
          </LinkButton>
        </div>
      </section>
    </>
  );
}

function CategoryCard({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden">
      <PlaceholderImage
        label={label}
        showLabel={false}
        className="aspect-[3/4] w-full"
      />
      <span className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent p-6 text-lg tracking-[0.1em] uppercase text-white">
        {label}
      </span>
    </Link>
  );
}
