import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { posts, getPostBySlug } from "@/lib/placeholder-journal";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const loc = locale as AppLocale;

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const title = loc === "vi" ? post.titleVi : post.titleEn;
  const body = loc === "vi" ? post.bodyVi : post.bodyEn;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {t("readingTime")}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <PlaceholderImage
        label={title}
        src={post.coverImage}
        priority
        showLabel={false}
        className="mt-8 aspect-[16/9] w-full"
      />
      <p className="mt-8 text-base leading-relaxed text-ink">{body}</p>
      <Link
        href="/journal"
        className="mt-12 inline-block text-sm text-ink underline underline-offset-4"
      >
        {t("backToJournal")}
      </Link>
    </article>
  );
}
