import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/storefront/legal-page";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage titleKey="termsTitle" />;
}
