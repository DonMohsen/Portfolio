import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Projects } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ projects }: { projects: ProjectsWithTechsType[] }) => {
  return (
    <>
      {projects.map((project) => (
        <Link
        href={`/Projects/${project.id}`}
          key={project.id}
          className="bg-white dark:bg-black text-white flex flex-col items-center justify-center p-4 rounded-[10px]"
        >
          {project.image && (
            <div className="w-full h-full relative ">

            <Image
              src={project.image}
              alt={project.name}
              width={1919}
              height={975}
              quality={100}
              priority={true}
              className="rotate-3 relative transition-all duration-500 w-full z-20 rounded-[7px] "
              />
              <span className="dark:bg-[#151a34] rounded-3xl w-[100%] h-full absolute top-0 right-0 z-10 bg-slate-200">

              </span>
              </div>
               
          )}
          <div className=" w-full justify-start mt-4  items-center">
            <h3 className="text-[1.5rem] font-bold tracking-tighter">

          {project.name}
            </h3>
          <p className="">
            {project.description}
          </p>
            
          </div>
          <div className="flex items-center justify-center   px-4 py-1 ">
            {project.techStack.map((stack,_index) => (
              <div
                key={stack.technology.id}
                className=" flex items-center justify-center flex-row "
              >
                <div 
                 style={{
                    transform: `translateX(-${_index * 10}px)` // Dynamic translation
                  }}
                className=" w-10 h-10 dark:bg-black  bg-white border dark:border-white/[.2] border-black/[.2]  top-0 right-0 rounded-full z-0 flex items-center justify-center">

                <img
                  src={stack.technology.imageUrl}
                  alt={stack.technology.name}
                  className="w-8 h-8 dark:text-white z-10" 
                 
                  />
                  </div>
                
              </div>
            ))}
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProjectCard;
