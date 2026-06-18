"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectOverviewItem } from "./types";
import ProjectImageCarouselLazy from "./ProjectImageCarouselLazy";
import ProjectTechStackAvatars from "./ProjectTechStackAvatars";

type ProjectOverviewCardProps = {
  project: ProjectOverviewItem;
  locale: string;
};

export default function ProjectOverviewCard({
  project,
  locale,
}: ProjectOverviewCardProps) {
  const isFa = locale === "fa";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card shadow-[var(--tech-card-shadow)] transition-colors duration-500">
      <div className="relative">
        <ProjectImageCarouselLazy
          images={project.images}
          title={project.title}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex flex-wrap gap-2 p-3">
          {project.isLive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-[2px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          ) : null}
          {project.isOpenSource ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100 backdrop-blur-[2px]">
              OSS
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-page-text sm:text-[1.35rem]">
            {project.title}
          </h3>
          {project.technologies.length > 0 ? (
            <ProjectTechStackAvatars
              technologies={project.technologies}
            />
          ) : null}
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-page-subtle">
          {project.description}
        </p>

        <div className="mt-auto flex flex-col gap-2.5 pt-4 sm:flex-row sm:items-center">
          <Link
            href={project.detailHref}
            data-transition-label={project.title}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-tech-card-border bg-page/30 px-4 py-2.5 text-sm font-semibold text-page-text transition-colors duration-300 hover:border-accent-cosmic/40 hover:text-accent-cosmic"
          >
            {isFa ? "مشاهده جزئیات پروژه" : "View project details"}
            <span aria-hidden>›</span>
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-tech-card-border bg-page/30 text-page-text transition-colors duration-300 hover:border-accent-cosmic/40 hover:text-accent-cosmic"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-tech-card-border bg-page/30 text-page-text transition-colors duration-300 hover:border-accent-cosmic/40 hover:text-accent-cosmic"
                aria-label={`${project.title} live demo`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
