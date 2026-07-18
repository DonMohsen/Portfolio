import type { Metadata } from "next";
import StatsPageContent from "@/components/stats/StatsPageContent";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "آمار قابل استناد | محسن خجسته‌نژاد"
      : "Citeable Stats | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "متریک‌های قبل/بعد از case studyها و شمارش‌های سایت — برای استناد founders، رسانه و AI."
      : "Before/after case-study metrics and site counts — for founders, press, and AI citation.",
    alternates: buildLocaleAlternates(locale, "stats"),
  };
}

export default async function StatsPage(props: { params: Params }) {
  const { locale } = await props.params;
  return <StatsPageContent locale={locale} />;
}
