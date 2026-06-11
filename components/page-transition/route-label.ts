const LABELS = {
  en: {
    home: "Home",
    projects: "Projects",
    project: "Project",
    blogs: "Blog",
    page: "Page",
  },
  fa: {
    home: "خانه",
    projects: "پروژه‌ها",
    project: "پروژه",
    blogs: "بلاگ",
    page: "صفحه",
  },
} as const;

function localeFromPath(pathname: string): "en" | "fa" {
  return pathname.startsWith("/fa") ? "fa" : "en";
}

function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|fa)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

export function getRouteLabelFromPathname(pathname: string): string {
  const locale = localeFromPath(pathname);
  const labels = LABELS[locale];
  const path = stripLocale(pathname);

  if (path === "/" || path === "") return labels.home;
  if (path === "/projects" || path.startsWith("/projects?")) return labels.projects;
  if (path.startsWith("/projects/")) return labels.project;
  if (path === "/blogs" || path.startsWith("/blogs")) return labels.blogs;

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
