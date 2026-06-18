const faDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const enDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatBlogDate(
  dateString: string,
  locale: string,
  includeRelative = false
): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const isFa = locale === "fa";
  const formatter = isFa ? faDateFormatter : enDateFormatter;

  if (includeRelative) {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const diffDays = Math.round(
      (startOfToday.getTime() - startOfDate.getTime()) / 86_400_000
    );

    const formatted = formatter.format(date);
    if (diffDays === 0) {
      return isFa ? `امروز - ${formatted}` : `Today - ${formatted}`;
    }
    if (diffDays === 1) {
      return isFa ? `دیروز - ${formatted}` : `Yesterday - ${formatted}`;
    }
    return formatted;
  }

  return formatter.format(date);
}

export function formatReadTime(minutes: number, locale: string): string {
  const safe = Math.max(1, Math.round(minutes));
  return locale === "fa"
    ? `${safe} دقیقه مطالعه`
    : `${safe} min read`;
}
