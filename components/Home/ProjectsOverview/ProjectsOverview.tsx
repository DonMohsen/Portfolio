import Link from "next/link";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { toPersianDigits } from "@/utils/format";
import ProjectOverviewCard from "./ProjectOverviewCard";
import { mapProjectToOverview } from "./map-project";

type ProjectsOverviewProps = {
  projects: ProjectsWithTechsType[];
  locale: string;
  projectCount: number;
};

export default function ProjectsOverview({
  projects,
  locale,
  projectCount,
}: ProjectsOverviewProps) {
  const isFa = locale === "fa";
  const overviewProjects = projects.map((project) =>
    mapProjectToOverview(project, locale)
  );

  if (overviewProjects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="projects-overview-heading"
      className="w-full py-8 md:py-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-1 sm:px-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className={isFa ? "text-right" : "text-left"}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
              {isFa ? "نمونه کار" : "Selected work"}
            </p>
            <h2
              id="projects-overview-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl"
            >
              {isFa ? "پروژه‌های منتخب" : "Projects overview"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-page-subtle sm:text-[15px]">
              {isFa
                ? "چهار پروژه اخیر با تصاویر قابل جابه‌جایی، لینک مستقیم به جزئیات و دسترسی سریع به مخزن یا نسخه لایو."
                : "Four recent builds with swipeable previews, detail pages, and quick access to live demos or repositories."}
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-tech-card-border bg-tech-card px-4 py-2.5 text-sm font-semibold text-page-text transition-colors duration-300 hover:border-accent-cosmic/40 hover:text-accent-cosmic"
          >
            {isFa
              ? `مشاهده همه ${toPersianDigits(projectCount)} پروژه`
              : `See all ${projectCount} projects`}
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {overviewProjects.map((project, index) => (
            <li key={project.id} className="min-w-0">
              <ProjectOverviewCard project={project} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
