import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { LinkButton } from "@/components/ui/button";

export default async function VipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vip");

  const tiers = [
    { name: t("tierSilverName"), perk: t("tierSilverPerk") },
    { name: t("tierGoldName"), perk: t("tierGoldPerk") },
    { name: t("tierPlatinumName"), perk: t("tierPlatinumPerk") },
  ];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="border border-border p-8">
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {tier.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{tier.perk}</p>
            </div>
          ))}
        </div>
        <LinkButton href="/register" variant="primary" className="mt-10 w-fit">
          {t("cta")}
        </LinkButton>
      </div>
    </>
  );
}
