import type { ProjectMetricsRow } from "@/lib/projects/types";

type MetricsTableProps = {
  rows: ProjectMetricsRow[];
  locale: string;
};

export default function MetricsTable({ rows, locale }: MetricsTableProps) {
  const isFa = locale === "fa";

  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-tech-card-border">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-tech-card-border bg-tech-card/60 text-left">
            <th className="px-4 py-3 font-semibold text-page-text">
              {isFa ? "معیار" : "Metric"}
            </th>
            <th className="px-4 py-3 font-semibold text-page-text">
              {isFa ? "قبل" : "Before"}
            </th>
            <th className="px-4 py-3 font-semibold text-page-text">
              {isFa ? "بعد" : "After"}
            </th>
            <th className="px-4 py-3 font-semibold text-page-text">
              {isFa ? "تغییر" : "Change"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-tech-card-border/70 last:border-0"
            >
              <td className="px-4 py-3 font-medium text-page-text">{row.label}</td>
              <td className="px-4 py-3 text-page-subtle">{row.before ?? "—"}</td>
              <td className="px-4 py-3 text-page-text">{row.after ?? "—"}</td>
              <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-300">
                {row.delta ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
