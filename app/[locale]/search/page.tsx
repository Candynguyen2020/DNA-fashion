import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("search");

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
        {t("title")}
      </h1>
      <label htmlFor="site-search" className="sr-only">
        {t("placeholder")}
      </label>
      <input
        id="site-search"
        type="search"
        placeholder={t("placeholder")}
        className="mt-6 min-h-11 w-full border-b border-ink bg-transparent px-1 py-3 text-lg focus:outline-none"
      />
      <p className="mt-8 text-sm text-muted-foreground">{t("emptyState")}</p>
    </div>
  );
}
