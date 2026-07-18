import Image from "next/image";
import { ProjectDetail } from "@/lib/projects/types";
import { resolveProjectYear } from "@/lib/projects/map-project-detail";
import IndustryBadge from "@/components/CaseStudy/IndustryBadge";

type ProjectHeroProps = {
  project: ProjectDetail;
  locale: string;
};

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

export default function ProjectHero({ project, locale }: ProjectHeroProps) {
  const isFa = locale === "fa";
  const heroImage = project.images[0] ?? "/image-placeholder.webp";
  const displayYear = resolveProjectYear(project);

  const projectTypeLabel =
    project.projectType === "Practice"
      ? isFa
        ? "تمرین شخصی"
        : "Practice"
      : project.projectType === "Copy"
        ? isFa
          ? "کپی شده"
          : "Copied"
        : project.projectType === "Forked"
          ? isFa
            ? "فورک شده"
            : "Forked"
          : isFa
            ? "واقعی"
            : "Production";

  const typeBadgeClass =
    project.projectType === "Practice"
      ? "bg-blue-300 text-blue-900"
      : project.projectType === "Copy"
        ? "bg-green-300 text-green-900"
        : project.projectType === "Forked"
          ? "bg-purple-300 text-purple-900"
          : "bg-red-300 text-red-900";

  return (
    <header className="w-full max-w-4xl">
      <div className="w-full max-md:h-[400px] h-[550px] relative rounded-[8px] overflow-hidden">
        <Image
          src={heroImage}
          alt={`${project.name} — ${isFa ? "تصویر پروژه" : "project cover"}`}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 896px"
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      <div className="mt-6 w-full max-lg:px-4">
        <h1 className="text-[30px] font-extrabold font-IRANSansXBlack">
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mb-3 mt-2">
          <span
            className={`px-3 py-1 rounded-md text-sm font-IRANSansXMedium ${typeBadgeClass}`}
          >
            {projectTypeLabel}
          </span>
          <span className="text-sm text-muted-foreground font-IRANSansXMedium">
            {displayYear}
          </span>
          {project.role ? (
            <span className="text-sm text-muted-foreground font-IRANSansXMedium">
              {project.role}
            </span>
          ) : null}
          {project.industry ? (
            <IndustryBadge industry={project.industry} locale={locale} />
          ) : null}
          {project.outcomeMetric ? (
            <span className="text-sm text-emerald-700 dark:text-emerald-300 font-IRANSansXMedium">
              {project.outcomeMetric}
            </span>
          ) : null}
          {project.competency === 100 && (
            <span className="px-3 py-1 rounded-md bg-yellow-200 text-yellow-950 font-bold text-sm">
              {isFa ? "تکمیل شده" : "Completed"}
            </span>
          )}
        </div>
        <p
          className="font-IRANSansXUltraLight text-base leading-relaxed"
          dir={isFa ? "rtl" : "ltr"}
        >
          {project.summary}
        </p>
      </div>
    </header>
  );
}
