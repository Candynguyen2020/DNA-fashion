import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";

export async function LegalPage({ titleKey }: { titleKey: "termsTitle" | "privacyTitle" | "returnsTitle" }) {
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t(titleKey)} />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("placeholderBody")}
        </p>
      </div>
    </>
  );
}
