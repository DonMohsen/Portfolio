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
        className="relative   overflow-hidden group border-black/[0.1] dark:border-white/[0.4] border-[0.1px]  dark:bg-black text-white flex flex-col  rounded-[8px]   duration-300"
      >
        {/* Image Container */}
        {project.image && (
          <div className=" relative    w-full h-full max-h-[200px]  rounded-[8px]">
            <Image
              src={project.image}
              alt={`${project.name} image`}
              width={1280}
              height={720}
              quality={100}
              priority={true}
              className="border-none x w-full h-full object-cover transition-transform duration-500 rounded-[8px] "
            />

            <div className="transition-all duration-500 absolute w-full h-full z-50 bg-black top-0 right-0 rounded-[8px] dark:bg-opacity-20 bg-opacity-0"></div>
          </div>
        )}

        {/* Content Section */}
        <div className="px-2 pb-2   select-none flex flex-col  items-end justify-end">
          <div className="w-full flex flex-row items-center justify-center">
           <div className="text-[18px] max-md:text-[16px] flex gap-1 items-center justify-start font-bold w-full text-right text-black dark:text-white">
            <p className="w-fit ">

              {project.name}
            </p>
              <p
                className={clsx(
                  " rounded-[4px]  p-[4px]  max-md:text-[10px] text-[12px] font-IRANSansXDemiBold flex-shrink",
                  projectTypeConfig[project.projectType]?.bgColor,
                  projectTypeConfig[project.projectType]?.textColor
                )}
              >
                {projectTypeConfig[project.projectType]?.text}
              </p>
            </div>
               <div className="w-fit flex items-center justify-end ">
              <CompetencyCircle
                unfilledColor="#edebed"
                filledColor={getProjectCompetencyColor(project.competency)}
                competency={project.competency}
                size={50}
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="flex-row flex justify-between w-full items-center">
          
          </div>

          <div className="flex items-center justify-between mt-2 w-full">
                <div className="flex -space-x-3" dir="ltr">
                
              {project.techStack.slice(0, 3).map((tech, index) => (
                <div
                  key={tech.technology.id}
                  className="w-8 h-8 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center "
                >
                  <img
                    src={tech.technology.imageUrl}
                    alt={`${tech.technology.name} image`}
                    className="w-6 h-6 object-contain "
                  />
                </div>
              ))}
                {project.techStack.length > 3 && (
                <div className=" w-8 h-8 bg-white pr-1  dark:bg-neutral-900 border border-black/[.2] font-IRANSansXDemiBold dark:border-neutral-800 rounded-full flex items-center justify-center text-sm font-medium text-black/[0.7] dark:text-neutral-400">
                  <p className="translate-y-[1px] font-IRANSansXExtraBold">
                    +
                    {getPersianNumbers(
                      (project.techStack.length - 3).toString()
                    )}
                    
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
    </>
  );
};

export default ProjectCardItem;
