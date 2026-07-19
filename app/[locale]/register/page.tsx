import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/storefront/page-hero";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <>
      <PageHero title={t("registerTitle")} intro={t("registerIntro")} />
      <div className="mx-auto max-w-sm px-4 py-14 sm:px-6 lg:px-8">
        <form className="space-y-5">
          <Field id="register-name" label={t("nameLabel")} type="text" />
          <Field id="register-email" label={t("emailLabel")} type="email" />
          <Field id="register-password" label={t("passwordLabel")} type="password" />
          <Button type="submit" variant="primary" className="w-full">
            {t("registerSubmit")}
          </Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          {t("haveAccount")}{" "}
          <Link href="/login" className="text-ink underline underline-offset-4">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </>
  );
}

function Field({ id, label, type }: { id: string; label: string; type: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="mt-2 min-h-11 w-full border border-border px-4 text-sm focus:border-ink focus:outline-none"
      />
    </div>
  );
}
