import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/storefront/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { posts } from "@/lib/placeholder-journal";
import type { AppLocale } from "@/i18n/routing";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const loc = locale as AppLocale;

  return (
    <>
      <PageHero title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {posts.map((post) => {
            const title = loc === "vi" ? post.titleVi : post.titleEn;
            const excerpt = loc === "vi" ? post.excerptVi : post.excerptEn;
            return (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
                <PlaceholderImage
                  label={title}
                  src={post.coverImage}
                  showLabel={false}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <h2 className="mt-4 text-base font-medium text-ink">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
