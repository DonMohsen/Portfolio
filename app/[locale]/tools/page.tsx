import type { Metadata } from "next";
import ToolsHubContent from "@/components/tools/ToolsHubContent";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "ابزارهای رایگان | محسن خجسته‌نژاد"
      : "Free Tools | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "ماشین‌حساب هزینه ساخت اپلیکیشن، تست سرعت و ابزارهای lead — قبل از تماس scope را شفاف کنید."
      : "MVP cost calculator, speed scorecard, and lead magnets — clarify scope before you book a call.",
    alternates: buildLocaleAlternates(locale, "tools"),
  };
}

export default async function ToolsPage(props: { params: Params }) {
  const { locale } = await props.params;
  return <ToolsHubContent locale={locale} />;
}
