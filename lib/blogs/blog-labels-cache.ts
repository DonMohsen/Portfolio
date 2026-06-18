let blogLabelsCache: Record<string, { en: string; fa: string }> = {};

export function setBlogLabelsCache(
  labels: Record<string, { en: string; fa: string }>
) {
  blogLabelsCache = labels;
}

export function getBlogLabelFromCache(slug: string, locale: "en" | "fa") {
  const entry = blogLabelsCache[slug];
  if (!entry) return null;
  return locale === "fa" ? entry.fa : entry.en;
}

export async function fetchBlogLabelsCache() {
  try {
    const response = await fetch("/api/blog/labels", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as Record<
      string,
      { en: string; fa: string }
    >;
    setBlogLabelsCache(data);
  } catch {
    // ignore — fallback labels still work
  }
}
