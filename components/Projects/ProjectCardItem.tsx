"use client";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Github } from "lucide-react";
import { Link as LucideLink } from "lucide-react";
import { getPersianNumbers } from "@/utils/numbers";

const ProjectCardItem = ({ project }: { project: ProjectsWithTechsType }) => {
  const projectTypeConfig = {
    Copy: {
      text: "کپی شده", // Custom display text
      bgColor: "bg-green-300",
      textColor: "text-green-900",
    },
    Forked: {
      text: "فورک شده",
      bgColor: "bg-purple-300",
      textColor: "text-purple-900",
    },
    Practice: {
      text: "تمرینی", // Custom text instead of "Practice"
      bgColor: "bg-blue-300",
      textColor: "text-blue-900",
    },
    // Default fallback (optional)
    Real: {
      text: "واقعی",
      bgColor: "bg-red-500/90",
      textColor: "text-red-100",
    },
  };

  return (
    <>
      <Link
        href={`/projects/${project.id}`}

        className="bg-[#f6f6f6] p-[12px] group border-black/[0.1] dark:border-white/[0.4] border  dark:bg-black text-white flex flex-col  rounded-[20px]   duration-300"
      >
        {/* Image Container */}
        {project.image && (
          <div className=" relative overflow-hidden    min-h-[200px] h-[200px]  rounded-[10px]">
            <Image
              src={project.image}
              alt={`${project.name} image`}
              width={1280}
              height={720}
              quality={100}
              priority={true}
              className="border-none group-hover:scale-110 w-full h-full object-cover transition-transform duration-500 rounded-xl "
            />

            <div className="transition-all duration-500 absolute w-full h-full z-50 bg-black top-0 right-0 rounded-[10px] dark:bg-opacity-20 bg-opacity-0"></div>
          </div>
        )}

        {/* Content Section */}
        <div className=" mt-[1rem]   select-none flex flex-col items-end justify-end">
          <div
            className={clsx(
              "flex items-center justify-start rounded-[4px] w-fit p-[4px] mb-[24px] text-sm font-IRANSansXDemiBold flex-shrink",
              projectTypeConfig[project.projectType]?.bgColor,
              projectTypeConfig[project.projectType]?.textColor
            )}
          >
            {projectTypeConfig[project.projectType]?.text}
          </div>
          <div className="flex-col justify-between  items-center">
            <div className="text-[24px] leading-[26px] mb-2 font-bold tracking-tight text-black dark:text-white">
              {project.name}
            </div>
          </div>
          <div className="w-full flex-col mt-6 text-black dark:text-white">
            <div className="h-[20px] relative bg-gray-200 rounded-full mt-2 overflow-hidden">
              {/* Progress bar background */}
              <div
                style={{ width: `${project.competency}%` }}
                className={`h-full absolute bg-green-600 rounded-full right-0`}
              />

              {/* Centered text container - positioned absolutely over both bars */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-[16px] font-IRANSansXMedium text-black">
                <p>تکمیل</p>
                <div>{`${getPersianNumbers(
                  project.competency.toString()
                )}%`}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 w-full">
            <div className="flex items-center justify-center gap-5">
              <Github className="text-black dark:text-white" />
              <LucideLink className="text-black dark:text-white" />
            </div>
            <div className="flex -space-x-3">
              {project.techStack.slice(0, 3).map((tech, index) => (
                <div
                  key={tech.technology.id}
                  className="w-10 h-10 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center "
                >
                  <img
                    src={tech.technology.imageUrl}
                    alt={`${tech.technology.name} image`}
                    className="w-6 h-6 object-contain "
                  />
                </div>
              ))}
              {project.techStack.length > 3 && (
                <div className="w-10 h-10 bg-white pr-1 dark:bg-neutral-900 border border-black/[.2] font-IRANSansXDemiBold dark:border-neutral-800 rounded-full flex items-center justify-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  +
                  {getPersianNumbers((project.techStack.length - 3).toString())}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectCardItem;
