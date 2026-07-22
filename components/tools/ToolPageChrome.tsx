import SoftProjectCta from "@/components/conversion/SoftProjectCta";
import Link from "next/link";
import TrustStrip from "@/components/Home/TrustStrip";

type ToolPageChromeProps = {
  locale: string;
  toolSlug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  faq?: React.ReactNode;
};

export default function ToolPageChrome({
  locale,
  toolSlug,
  eyebrow,
  title,
  subtitle,
  children,
  faq,
}: ToolPageChromeProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-3xl px-5 pb-4 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <Link
          href={`/${locale}/tools`}
          className="text-sm font-medium text-accent-cosmic hover:underline"
        >
          {isFa ? "← همه ابزارها" : "← All tools"}
        </Link>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-page-subtle">{subtitle}</p>
      </section>

      <TrustStrip locale={locale} />

      <section
        className={`mx-auto max-w-3xl px-5 py-10 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        {children}

        <div className="mt-12">
          <SoftProjectCta
            locale={locale}
            source={`tool:${toolSlug}`}
          />
        </div>
      </section>

      {faq ? (
        <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12">
          {faq}
        </section>
      ) : null}
    </div>
  );
}
