export function calculateReadTimeMinutes(htmlEn: string, htmlFa: string): number {
  const strip = (html: string) =>
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const text = `${strip(htmlEn)} ${strip(htmlFa)}`.trim();
  if (!text) return 1;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
