export function buildBlogListHref(
  locale: string,
  params: { page?: number; category?: string; sort?: string }
): string {
  const search = new URLSearchParams();
  if (params.category && params.category !== "all") {
    search.set("category", params.category);
  }
  if (params.page && params.page > 1) {
    search.set("page", String(params.page));
  }
  if (params.sort && params.sort !== "latest") {
    search.set("sort", params.sort);
  }
  const query = search.toString();
  return `/${locale}/blogs${query ? `?${query}` : ""}`;
}
