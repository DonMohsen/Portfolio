import Link from "next/link";
import ComparisonTable from "@/components/about/ComparisonTable";

type HomeComparisonSnippetProps = {
  locale: string;
};

export default function HomeComparisonSnippet({
  locale,
}: HomeComparisonSnippetProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <section
      className={`mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      aria-labelledby="home-comparison-heading"
    >
      <ComparisonTable locale={locale} compact />
      <p className={`mt-6 text-sm text-page-muted ${textAlign}`}>
        <Link href={`/${locale}/about`} className="font-medium text-accent-cosmic hover:underline">
          {isFa ? "درباره کامل و سوابق" : "Full about & credentials"}
        </Link>
      </p>
    </section>
  );
}
