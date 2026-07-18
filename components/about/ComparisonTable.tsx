import {
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  type ComparisonCell,
  type ComparisonRow,
} from "@/lib/about/content";
import { pick } from "@/lib/services/pick";
import type { LocalizedText } from "@/lib/services/types";

type ComparisonTableProps = {
  locale: string;
  className?: string;
  compact?: boolean;
};

function isLocalizedText(
  value: ComparisonCell | LocalizedText
): value is LocalizedText {
  return typeof value === "object" && value !== null && "en" in value;
}

function CellValue({
  locale,
  value,
}: {
  locale: string;
  value: ComparisonCell | LocalizedText;
}) {
  const isFa = locale === "fa";

  if (isLocalizedText(value)) {
    return <span className="text-[14px] text-page-subtle">{pick(locale, value)}</span>;
  }

  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-page-text">
        <span className="text-accent-cosmic" aria-hidden>
          ✓
        </span>
        {isFa ? "بله" : "Yes"}
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-page-subtle">
        <span aria-hidden>~</span>
        {isFa ? "تا حدی" : "Partial"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-page-muted">
      <span aria-hidden>—</span>
      {isFa ? "خیر" : "No"}
    </span>
  );
}

function ComparisonRowCells({
  locale,
  row,
}: {
  locale: string;
  row: ComparisonRow;
}) {
  return (
    <>
      <td className="px-4 py-4 align-top">
        <CellValue locale={locale} value={row.freelancer} />
      </td>
      <td className="px-4 py-4 align-top">
        <CellValue locale={locale} value={row.agency} />
      </td>
      <td className="px-4 py-4 align-top bg-accent-cosmic/5">
        <CellValue locale={locale} value={row.me} />
      </td>
    </>
  );
}

export default function ComparisonTable({
  locale,
  className = "",
  compact = false,
}: ComparisonTableProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const rows = compact ? COMPARISON_ROWS.slice(0, 2) : COMPARISON_ROWS;

  return (
    <section className={className} aria-labelledby="comparison-heading">
      <h2
        id="comparison-heading"
        className={`text-2xl font-semibold tracking-tight text-page-text sm:text-3xl ${textAlign}`}
      >
        {isFa ? "مقایسه" : "Comparison"}
      </h2>
      <p className={`mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle ${textAlign}`}>
        {isFa
          ? "فریلنسر ارزان، آژانس گران — یا مالکیت معماری با ارتباط مستقیم."
          : "Cheap freelancer, expensive agency — or architecture ownership with direct communication."}
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-tech-card-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-tech-card-border bg-page/60">
              <th
                scope="col"
                className={`px-4 py-4 font-semibold text-page-text ${textAlign}`}
              >
                {isFa ? "معیار" : "Criteria"}
              </th>
              <th
                scope="col"
                className={`px-4 py-4 font-semibold text-page-subtle ${textAlign}`}
              >
                {pick(locale, COMPARISON_COLUMNS.freelancer)}
              </th>
              <th
                scope="col"
                className={`px-4 py-4 font-semibold text-page-subtle ${textAlign}`}
              >
                {pick(locale, COMPARISON_COLUMNS.agency)}
              </th>
              <th
                scope="col"
                className={`px-4 py-4 font-semibold text-accent-cosmic ${textAlign}`}
              >
                {pick(locale, COMPARISON_COLUMNS.me)}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={pick(locale, row.label)}
                className="border-b border-tech-card-border last:border-b-0"
              >
                <th
                  scope="row"
                  className={`px-4 py-4 font-medium text-page-text ${textAlign}`}
                >
                  {pick(locale, row.label)}
                </th>
                <ComparisonRowCells locale={locale} row={row} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
