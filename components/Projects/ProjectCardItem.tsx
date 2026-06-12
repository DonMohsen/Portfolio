"use client";

import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Github } from "lucide-react";
import { Link as LucideLink } from "lucide-react";
import { getPersianNumbers } from "@/utils/numbers";
import CompetencyCircle from "../CompetencyMeter";
import { getProjectCompetencyColor } from "@/lib/getProjectCompetencyColor";
import { useLocale } from "next-intl";
import { getProjectSlug } from "@/lib/projects/get-project-slug";
import { parseProjectImages } from "@/lib/projects/parse-project-images";

type ProjectCardItemProps = {
  project: ProjectsWithTechsType;
  locale?: string;
  priorityImage?: boolean;
};

const ProjectCardItem = ({
  project,
  locale: localeProp,
  priorityImage = false,
}: ProjectCardItemProps) => {
  const hookLocale = useLocale();
  const locale = localeProp ?? hookLocale;
  const isFa = locale === "fa";
  const coverImage = parseProjectImages(project.image)[0];

  const projectTypeConfig = {
    Copy: {
      text: isFa ? "کپی شده" : "Copied",
      bgColor: "bg-green-300",
      textColor: "text-green-900",
    },
    Forked: {
      text: isFa ? "فورک شده" : "Forked",
      bgColor: "bg-purple-300",
      textColor: "text-purple-900",
    },
    Practice: {
      text: isFa ? "تمرینی" : "Practice",
      bgColor: "bg-blue-300",
      textColor: "text-blue-900",
    },
    Real: {
      text: isFa ? "واقعی" : "Production",
      bgColor: "bg-red-700",
      textColor: "text-red-50",
    },
  };

  return (
    <Link
      href={`/${locale}/projects/${getProjectSlug(project)}`}
      className="relative overflow-hidden group border-black/[0.1] dark:border-white/[0.4] border-[0.1px] dark:bg-black text-white flex flex-col rounded-[8px] duration-300"
    >
      {coverImage && (
        <div className="relative w-full h-full max-h-[200px] rounded-[8px]">
          <Image
            src={coverImage}
            alt={`${project.name} image`}
            width={1280}
            height={720}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="border-none w-full h-full object-cover transition-transform duration-500 rounded-[8px]"
            priority={priorityImage}
            fetchPriority={priorityImage ? "high" : "auto"}
            loading={priorityImage ? "eager" : "lazy"}
          />
          <div className="transition-all duration-500 absolute w-full h-full z-50 bg-black top-0 right-0 rounded-[8px] dark:bg-opacity-20 bg-opacity-0" />
        </div>
      )}

      <div className="px-2 pb-2 select-none flex flex-col items-end justify-end">
        <div className="w-full flex flex-row items-center justify-center">
          <div className="text-[18px] max-md:text-[16px] flex gap-1 items-center justify-start font-bold w-full text-right text-black dark:text-white">
            <p className="w-fit">{project.name}</p>
            <p
              className={clsx(
                "rounded-[4px] p-[4px] max-md:text-[10px] text-[12px] font-IRANSansXDemiBold flex-shrink",
                projectTypeConfig[project.projectType]?.bgColor,
                projectTypeConfig[project.projectType]?.textColor
              )}
            >
              {projectTypeConfig[project.projectType]?.text}
            </p>
          </div>
          <div className="w-fit flex items-center justify-end">
            <CompetencyCircle
              unfilledColor="#edebed"
              filledColor={getProjectCompetencyColor(project.competency)}
              competency={project.competency}
              size={50}
              strokeWidth={2}
            />
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
                  alt={`${tech.technology.name} image`}
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
            <Github className="text-black dark:text-white" />
            <LucideLink className="text-black dark:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardItem;
