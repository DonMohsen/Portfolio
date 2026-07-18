"use client";

import Link from "next/link";

type CaseStudyPdfActionsProps = {
  locale: string;
  slug: string;
};

export default function CaseStudyPdfActions({
  locale,
  slug,
}: CaseStudyPdfActionsProps) {
  const isFa = locale === "fa";

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white"
      >
        {isFa ? "چاپ / ذخیره PDF" : "Print / Save PDF"}
      </button>
      <Link
        href={`/${locale}/work/${slug}`}
        className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700"
      >
        {isFa ? "بازگشت به case study" : "Back to case study"}
      </Link>
    </div>
  );
}
