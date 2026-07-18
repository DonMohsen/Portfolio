import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ABOUT_SUMMARY } from "@/lib/about/content";
import { JOB_TITLE_EN, JOB_TITLE_FA } from "@/lib/seo/person-json-ld";

const AboutMe = async () => {
  const locale = await getLocale();
  const isFa = locale === "fa";

  return (
    <section
      className={`mx-auto max-w-3xl rounded-2xl border border-tech-card-border bg-page/40 p-6 sm:p-8 ${
        isFa ? "text-right" : "text-left"
      }`}
      aria-labelledby="home-about-heading"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
        {isFa ? "درباره" : "About"}
      </p>
      <h2
        id="home-about-heading"
        className="mt-2 text-2xl font-semibold tracking-tight text-page-text"
      >
        {isFa ? "محسن خجسته‌نژاد" : "Mohsen Khojasteh Nezhad"}
      </h2>
      <p className="mt-1 text-sm font-medium text-accent-cosmic">
        {isFa ? JOB_TITLE_FA : JOB_TITLE_EN}
      </p>
      <p className="mt-4 text-[15px] leading-7 text-page-subtle">
        {isFa ? ABOUT_SUMMARY.fa : ABOUT_SUMMARY.en}
      </p>
      <Link
        href={`/${locale}/about`}
        className="mt-6 inline-flex text-sm font-semibold text-accent-cosmic transition-colors hover:underline"
      >
        {isFa ? "داستان کامل و سوابق ←" : "Full story & credentials →"}
      </Link>
    </section>
  );
};

export default AboutMe;
