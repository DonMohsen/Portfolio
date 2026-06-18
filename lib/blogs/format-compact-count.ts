export function formatCompactCount(num: number, locale: string): string {
  const n = Math.max(0, Number(num) || 0);
  let formatted: string;

  if (n >= 1_000_000) formatted = `${(n / 1_000_000).toFixed(1)}M`;
  else if (n >= 1_000) formatted = `${(n / 1_000).toFixed(1)}k`;
  else formatted = String(n);

  if (locale === "fa") {
    return formatted.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)] ?? d);
  }

  return formatted;
}
