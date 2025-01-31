import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

import Image from "next/image";
import Link from "next/link";
import ImageModal from "./Modals/image-modal";
import { Button } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import { CircleChevronRight } from "lucide-react";
const ProjectCard = ({ projects }: { projects: ProjectsWithTechsType[] }) => {
  
  return (
    <>
      {projects.map((project) => (
  <div
    key={project.id}
    className="bg-white group dark:bg-black text-white flex flex-col p-4 rounded-xl w-full shadow-lg dark:shadow-neutral-800/20 hover:shadow-xl transition-shadow duration-300"
  >
    {/* Image Container */}
    {project.image && (
      <div className="w-full border-none min-h-[400px] relative max-sm:min-h-[300px]  flex items-center justify-center rounded-xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          width={1919}
          height={975}
          quality={100}
          priority={true}
          className="border-none w-full h-full object-cover transition-transform duration-500 "
        />
        
        {/* Image Overlay Interactions */}
        <div className="absolute top-0 w-full bg-black/0 transition-all duration-500 group-hover:bg-black/30 flex items-center justify-between px-10">
          <Link 
            href={project.githubLink} 
            target="_blank"
            className="opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
          >
            <FaGithub className="w-10 h-10 text-white/90 hover:text-white" />
          </Link>
          <Link 
            href={project.liveLink || ""} 
            target="_blank"
            className="opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:scale-110"
          >
            <Image
              width={50}
              height={50} 
              className="w-10 h-10"
              alt="liveLink" 
              src="/icons/web.png" 
            />
          </Link>
        </div>

        {/* Project Type Badge */}
        <div className={clsx(
          "absolute bottom-3 left-3 rounded-full px-4 py-1 text-sm font-medium backdrop-blur-sm",
          project.projectType === "Copy" ? "bg-green-500/90 text-green-100" :
          project.projectType === "Forked" ? "bg-purple-500/90 text-purple-100" :
          project.projectType === "Practice" ? "bg-blue-500/90 text-blue-100" :
          "bg-red-500/90 text-red-100"
        )}>
          {`${project.projectType} project`}
        </div>
      </div>
    )}

    {/* Content Section */}
    <div className="w-full mt-4 flex-grow flex flex-col select-none space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          {project.name}
        </h3>
        <div className="flex -space-x-3">
          {project.techStack.slice(0,3).map((tech, index) => (
            <div
              key={tech.technology.id}
              className="w-10 h-10 bg-white dark:bg-neutral-900 border border-black/[.2] dark:border-neutral-800 rounded-full flex items-center justify-center shadow-sm"
            >
              <img
                src={tech.technology.imageUrl}
                alt={tech.technology.name}
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
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 line-clamp-4 leading-relaxed">
        {project.description}
      </p>
    </div>

    {/* Enhanced Button */}
    <Link
    href={`/projects/${project.id}`}
    className="w-full mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 transition-all duration-300 shadow-md hover:shadow-lg group/button">
      <div className="flex items-center justify-between w-full">
        <span>View Details</span>
        <div className="flex items-center">
          <span className="mr-2 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300">
            Explore
          </span>
          <CircleChevronRight className="w-6 h-6 transition-transform duration-300 group-hover/button:translate-x-1" />
        </div>
      </div>
    </Link>
  </div>
))}
    </>
  );
};

export default ProjectCard;
