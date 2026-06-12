"use client";

import nextDynamic from "next/dynamic";

const ProjectsFilters = nextDynamic(() => import("./projects-filters"), {
  ssr: false,
  loading: () => (
    <div
      className="h-48 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-lg"
      aria-hidden
    />
  ),
});

export default function ProjectsFiltersDeferred() {
  return <ProjectsFilters />;
}
