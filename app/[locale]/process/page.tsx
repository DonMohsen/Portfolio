import type { Metadata } from "next";
import ProcessPageContent from "@/components/process/ProcessPageContent";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "فرآیند همکاری | محسن خجسته‌نژاد"
      : "How I Work | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "فرآیند شفاف از کشف تا تحویل — ۹۰ روز اول، دمو هفتگی و مستندات معماری متعلق به شما."
      : "Transparent process from discovery to handoff — First 90 Days, weekly demos, and architecture docs you own.",
    alternates: buildLocaleAlternates(locale, "process"),
  };
}

export default async function ProcessPage(props: { params: Params }) {
  const { locale } = await props.params;

  return <ProcessPageContent locale={locale} />;
}
