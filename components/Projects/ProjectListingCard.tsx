import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { getProjectSlug } from "@/lib/projects/get-project-slug";
import { getListingCardImageProps, resolveListingCoverSrc } from "@/lib/projects/listing-card-image";
import { PROJECT_CARD_TYPE_STYLES } from "@/lib/projects/project-card-styles";
import { getPersianNumbers } from "@/utils/numbers";
import clsx from "clsx";
import { Github, Link as LucideLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectCompetencyRing from "./ProjectCompetencyRing";

type ProjectListingCardProps = {
  project: ProjectsWithTechsType;
  locale: string;
  priorityImage?: boolean;
  eagerImage?: boolean;
};

export default function ProjectListingCard({
  project,
  locale,
  priorityImage = false,
  eagerImage = false,
}: ProjectListingCardProps) {
  const isFa = locale === "fa";
  const coverImage = resolveListingCoverSrc(project.image);
  const typeStyle = PROJECT_CARD_TYPE_STYLES[project.projectType];

  const imageProps = coverImage
    ? getListingCardImageProps(coverImage, `${project.name} image`, {
        priority: priorityImage,
        eager: eagerImage,
      })
    : null;

  return (
    <Link
      href={`/${locale}/projects/${getProjectSlug(project)}`}
      className="relative overflow-hidden group border-black/[0.1] dark:border-white/[0.4] border-[0.1px] dark:bg-black text-white flex flex-col rounded-[8px] duration-300"
    >
      {imageProps && (
        <div className="relative w-full aspect-[16/9] max-h-[200px] rounded-[8px] overflow-hidden">
          <img
            {...imageProps.props}
            className="object-cover rounded-[8px] w-full h-full"
          />
          <div className="absolute inset-0 z-10 rounded-[8px] dark:bg-opacity-20 bg-opacity-0 pointer-events-none" />
        </div>
      )}

      <div className="px-2 pb-2 select-none flex flex-col items-end justify-end">
        <div className="w-full flex flex-row items-center justify-center">
          <div className="text-[18px] max-md:text-[16px] flex gap-1 items-center justify-start font-bold w-full text-right text-black dark:text-white">
            <p className="w-fit">{project.name}</p>
            <p
              className={clsx(
                "rounded-[4px] p-[4px] max-md:text-[10px] text-[12px] font-IRANSansXDemiBold flex-shrink",
                typeStyle.bgColor,
                typeStyle.textColor
              )}
            >
              {isFa ? typeStyle.fa : typeStyle.en}
            </p>
          </div>
          <div className="w-fit flex items-center justify-end">
            <ProjectCompetencyRing competency={project.competency} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 w-full">
          <div className="flex -space-x-3" dir="ltr">
            {project.techStack.slice(0, 3).map((tech) => (
              <div
                key={tech.technology.id}
                className="w-8 h-8 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center"
              >
                <Image
                  src={tech.technology.imageUrl}
                  alt={tech.technology.name}
                  width={24}
                  height={24}
                  sizes="24px"
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {project.techStack.length > 3 && (
              <div className="w-8 h-8 bg-white pr-1 dark:bg-neutral-900 border border-black/[.2] font-IRANSansXDemiBold dark:border-neutral-800 rounded-full flex items-center justify-center text-sm font-medium text-black/[0.7] dark:text-neutral-400">
                <p className="translate-y-[1px] font-IRANSansXExtraBold">
                  +
                  {isFa
                    ? getPersianNumbers(
                        (project.techStack.length - 3).toString()
                      )
                    : project.techStack.length - 3}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-5">
            <Github className="text-black dark:text-white" aria-hidden />
            <LucideLink className="text-black dark:text-white" aria-hidden />
          </div>
        </div>
      </div>
    </Link>
  );
}
