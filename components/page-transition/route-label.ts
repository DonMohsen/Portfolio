import { getMockProjectTitleBySlug } from "@/lib/projects/mock-project-titles";
import { getBlogLabelFromCache } from "@/lib/blogs/blog-labels-cache";

const LABELS = {
  en: {
    home: "Home",
    work: "Case studies",
    project: "Case study",
    blogs: "Blog",
    stats: "Stats",
    tools: "Tools",
    ask: "Ask",
    page: "Page",
  },
  fa: {
    home: "خانه",
    work: "مطالعات موردی",
    project: "مطالعه موردی",
    blogs: "بلاگ",
    stats: "آمار",
    tools: "ابزارها",
    ask: "پرسش و پاسخ",
    page: "صفحه",
  },
} as const;

type Locale = keyof typeof LABELS;

function localeFromPath(pathname: string): Locale {
  return pathname.startsWith("/fa") ? "fa" : "en";
}

function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|fa)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

function humanizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveBlogPostLabel(slug: string, locale: Locale): string {
  const cached = getBlogLabelFromCache(slug, locale);
  if (cached) return cached;
  return humanizeSlug(slug);
}

function resolveProjectLabel(slug: string): string {
  const title = getMockProjectTitleBySlug(slug);
  if (title) return title;
  return humanizeSlug(slug);
}

export function getRouteLabelFromPathname(pathname: string): string {
  const locale = localeFromPath(pathname);
  const labels = LABELS[locale];
  const path = stripLocale(pathname);

  if (path === "/" || path === "") return labels.home;

  if (path === "/stats" || path.startsWith("/stats?")) {
    return labels.stats;
  }

  if (path === "/tools" || path.startsWith("/tools")) {
    return labels.tools;
  }

  if (path === "/ask" || path.startsWith("/ask?")) {
    return labels.ask;
  }

  if (path === "/work" || path.startsWith("/work?")) {
    return labels.work;
  }

  const projectMatch = path.match(/^\/work\/([^/?#]+)/);
  if (projectMatch?.[1]) {
    return resolveProjectLabel(projectMatch[1]);
  }

  if (path === "/blogs" || path === "/blogs/" || path.startsWith("/blogs?")) {
    return labels.blogs;
  }

  const blogMatch = path.match(/^\/blogs\/([^/?#]+)/);
  if (blogMatch?.[1]) {
    return resolveBlogPostLabel(blogMatch[1], locale);
  }

  return labels.page;
}

export function getRouteLabelFromHref(href: string): string {
  try {
    const url = new URL(href, "http://local");
    return getRouteLabelFromPathname(url.pathname);
  } catch {
    return getRouteLabelFromPathname(href.split("?")[0] ?? href);
  }
}

export const TRANSITION_LABEL_ATTR = "data-transition-label";

export function getTransitionLabelFromAnchor(
  anchor: HTMLAnchorElement
): string | null {
  const label = anchor.getAttribute(TRANSITION_LABEL_ATTR)?.trim();
  return label || null;
}
