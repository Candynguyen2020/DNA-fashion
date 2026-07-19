import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { LinkButton } from "@/components/ui/button";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");

  return (
    <>
      <PageHero title={t("title")} intro={t("intro")} />
      <div className="mx-auto flex max-w-2xl gap-4 px-4 py-14 sm:px-6 lg:px-8">
        <LinkButton href="/login" variant="primary">
          {t("goLogin")}
        </LinkButton>
        <LinkButton href="/register" variant="secondary">
          {t("goRegister")}
        </LinkButton>
      </div>
    </>
  );
}
