import { getAllProjects } from "@/app/actions/getAllProjects";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { Projects } from "@prisma/client";
import Image from "next/image";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import useProjectForm from "@/store/useProjectForm";
import ProjectForm from "../Forms/project-form";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
// export type ProjectsWithTechsType = Projects & {
//   techStack: {
//     technology: {
//       name: string,
//       image:string
//     };
//   }[];
// };
const AdminAllCards = () => {
  const [formType, setFormType] = useState<'put'|'post'>('put')
  const [currentProject, setCurrentProject] = useState<ProjectsWithTechsType>()
    const {isOpen,setFormState,toggleForm}=useProjectForm()
  async function fetchProjects(): Promise<ProjectsWithTechsType[]> {
    const response = await axios.get("/api/project");
    return response.data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchProjects,
  });
  const openTheForm=(id:number)=>{
    data?.map((project)=>{project.id===id&& setCurrentProject(project)})
    console.log(currentProject);
    setFormType('put')
    console.log(isOpen);
    setFormState(true)
  }
  const handleAddProject=()=>{
    setFormType('post')
    setFormState(true)
  }
  return (
    <div className="min-h-[110vh] gap-4 flex flex-col pt-[100px]">
      <AnimatePresence>

        {
          isOpen===true&&
          
          <ProjectForm type={formType} project={currentProject}   />
        }
        </AnimatePresence>
      {isLoading && (
        <div className="w-full pt-[100px] h-[200px] animate-pulse bg-slate-500 flex items-center justify-center"></div>
      )}
      {data?.map((project) => (
        <div
          className=" w-full  h-full flex items-center justify-center bg-purple-50 "
          key={project.id}

          // href={`/Projects/${project.id}`}
        >
          <div className="w-full flex items-center justify-start ">
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                width={1919}
                height={975}
                quality={100}
                priority={true}
                loading="eager"
                className="relative transition-all duration-500 w-[20%] max-sm:w-[30%] z-20 rounded-[7px] "
              />
            )}
            <div className="px-3 font-bold">{project.name}</div>
            <div className="flex max-sm:hidden">
                {project.techStack.map((tech,_index)=>(
                    <div 
                    key={tech.technology.id}
                    style={{
                       transform: `translateX(-${_index * 10}px)` // Dynamic translation
                     }}
                   className=" w-10 h-10 dark:bg-black  bg-white border dark:border-white/[.2] border-black/[.2]  top-0 right-0 rounded-full z-0 flex items-center justify-center">
   
                   <img
                     src={tech.technology.imageUrl}
                     alt={tech.technology.name}
                     className="w-8 h-8 dark:text-white z-10" 
                    
                     />
                     </div>
                ))}
            </div>
            <div className=" flex w-full gap-4 items-center justify-end pr-5 ">
                <Button
                onClick={() => openTheForm(project.id)}
                className="">
                <Pencil   />
                </Button>
                <Button className="">
                <Trash />
                </Button>
            </div>
          </div>
        </div>
      ))}
      <Button
      onClick={handleAddProject}
      >
        Add
      </Button>
    </div>
  );
};

export default AdminAllCards;
