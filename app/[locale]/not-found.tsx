import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-md flex-col items-start px-4 py-32 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("body")}</p>
      <LinkButton href="/" variant="primary" className="mt-8">
        {t("cta")}
      </LinkButton>
    </div>
  );
}
