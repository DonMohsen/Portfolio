import type { Metadata } from "next";
import TechStackScroller from "@/components/Home/TechStackScroller";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "استک فنی | محسن خجسته‌نژاد"
      : "Technical Stack | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "ابزارها و تکنولوژی‌هایی که برای ارزیابی فنی و تحویل محصول استفاده می‌کنم."
      : "Tools and technologies I use for technical evaluation and product delivery.",
    alternates: buildLocaleAlternates(locale, "stack"),
  };
}

export default async function StackPage(props: { params: Params }) {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-7xl px-5 pb-4 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${
          isFa ? "text-right" : "text-left"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {isFa ? "برای ارزیابان فنی" : "For technical evaluators"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
          {isFa ? "استک فنی" : "Technical stack"}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-page-subtle sm:text-base">
          {isFa
            ? "این صفحه برای CTO، lead فنی و تیم ارزیابی است — نه پیام اصلی خانه. اینجا می‌بینید با چه ابزارهایی محصول می‌سازم و تحویل می‌دهم."
            : "This page is for CTOs, tech leads, and evaluation teams — not the main homepage message. Here is what I use to build and ship products."}
        </p>
      </section>
      <TechStackScroller />
    </div>
  );
}
