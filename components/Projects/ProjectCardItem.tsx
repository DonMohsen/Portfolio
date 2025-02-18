"use client"
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import { CircleChevronRight, Github, Link } from "lucide-react";
const ProjectCardItem = ({ project }: { project: ProjectsWithTechsType }) => {
  
  return (
    <>
  <div
    className="bg-white p-[12px] border-black/[0.1] dark:border-white/[0.4] border  dark:bg-black text-white flex flex-col  rounded-[20px]   duration-300"
  >
    {/* Image Container */}
    {project.image && (
        <div className=" relative    min-h-[200px] h-[200px]  rounded-[10px]">
        <Image
          src={project.image}
          alt={`${project.name} image`}
          width={1280}
  height={720}
          quality={100}
          priority={true}
          className="border-none w-full h-full object-cover transition-transform duration-500 rounded-xl "
        />
        
      <div className="transition-all duration-500 absolute w-full h-full z-50 bg-black top-0 right-0 rounded-[10px] dark:bg-opacity-20 bg-opacity-0">

      </div>
      </div>
    )}

    {/* Content Section */}
    <div className=" mt-[1rem]   select-none">
    <div className={clsx(
          "  rounded-[4px] w-fit p-[4px] mb-[24px]  text-sm font-medium flex-shrink",
          project.projectType === "Copy" ? "bg-green-300 text-green-900" :
          project.projectType === "Forked" ? "bg-purple-300 text-purple-900" :
          project.projectType === "Practice" ? "bg-blue-300 text-blue-900" :
          "bg-red-500/90 text-red-100"
        )}>
          {`${project.projectType}`}
        </div>
      <div className="flex-col justify-between  items-center">
        <div className="text-[24px] leading-[26px] mb-2 font-bold tracking-tight text-black dark:text-white">
          {project.name}
        </div>
        {/* <div className="text-[16px] line-clamp-2 text-black dark:text-white">
          {project.description}
        </div> */}
   
      </div>
      <div className="w-full flex-col mt-6 text-black dark:text-white">
        <div className="flex justify-between w-full text-[16px] ">

        <p>
          Progress
          </p>
          <div>
            {`${project.competency}%`}
          </div>
        </div>
        <div className="h-[4px] relative bg-gray-200 rounded-full mt-2 ">
          <div 
          style={{ width: `${project.competency}% `} }
          className={`h-[4px] absolute bg-green-600 rounded-full`}>

          </div>
        </div>
      </div>
      <div>
        
      </div>
      <div className="flex items-center justify-between mt-6">
   
      <div className="flex -space-x-3">
          {project.techStack.slice(0,3).map((tech, index) => (
            <div
              key={tech.technology.id}
              className="w-10 h-10 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center "
            >
              <img
                src={tech.technology.imageUrl}
                alt={`${tech.technology.name} image`}
                className="w-6 h-6 object-contain"
              />
            </div>
          ))}
          {project.techStack.length > 3 && (
            <div className="w-10 h-10 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
              +{project.techStack.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-5">
        <Github className="text-black dark:text-white" />
        <Link className="text-black dark:text-white"/>
        </div>

      </div>

    </div>


  </div>

    </>
  );
};

export default ProjectCardItem;
