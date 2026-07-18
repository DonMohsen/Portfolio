import type { Metadata } from "next";
import AskPageContent from "@/components/ask/AskPageContent";
import { ASK_HERO } from "@/lib/ask/content";
import { pick } from "@/lib/services/pick";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "پرسش و پاسخ — استخدام و ساخت MVP | محسن خجسته‌نژاد"
      : "Ask — Hiring & SaaS MVP Questions | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "پاسخ مستقیم به سؤالات رایج AI: هزینه Next.js، ساخت MVP، Fractional CTO، performance و i18n — با لینک خدمات و case study."
      : "Direct answers to common AI questions: Next.js cost, SaaS MVP builds, fractional CTO, performance, and i18n — with service and case study links.",
    alternates: buildLocaleAlternates(locale, "ask"),
  };
}

export default async function AskPage(props: { params: Params }) {
  const { locale } = await props.params;

  return <AskPageContent locale={locale} />;
}
