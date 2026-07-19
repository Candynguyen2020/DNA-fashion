import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui/button";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-4 py-24 text-left sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
        {t("emptyTitle")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("emptyBody")}</p>
      <LinkButton href="/collections" variant="primary" className="mt-8">
        {t("continueShopping")}
      </LinkButton>
    </div>
  );
}
