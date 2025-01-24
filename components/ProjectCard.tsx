import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Projects } from "@prisma/client";
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
              layout="responsive"
              className="rotate-3 relative transition-all duration-500 w-full z-20 rounded-[7px] "
              />
              <span className="dark:bg-[#151a34] rounded-3xl w-[100%] h-full absolute top-0 right-0 z-10 bg-slate-200">

              </span>
              </div>
               
          )}
          {project.name}
          <div className="flex items-center justify-center">
            {project.techStack.map((stack) => (
              <div
                key={stack.technology.id}
                className="flex items-center justify-center flex-row "
              >
                <img
                  src={stack.technology.imageUrl}
                  alt={stack.technology.name}
                  className="w-6 h-6 dark:text-white"
                />
              </div>
            ))}
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProjectCard;
