"use client";

import nextDynamic from "next/dynamic";
import ProjectsToolbarSkeleton from "./projects-toolbar-skeleton";

const ProjectsToolbar = nextDynamic(
  () => import("./projects-toolbar"),
  {
    ssr: false,
    loading: () => <ProjectsToolbarSkeleton />,
  }
);

type ProjectsToolbarDeferredProps = {
  locale: string;
  resultCount: number;
};

export default function ProjectsToolbarDeferred({
  locale,
  resultCount,
}: ProjectsToolbarDeferredProps) {
  return <ProjectsToolbar locale={locale} resultCount={resultCount} />;
}
