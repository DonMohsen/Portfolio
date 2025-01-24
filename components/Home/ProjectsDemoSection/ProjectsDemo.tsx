import getAllProjectsCount from "@/app/actions/getProjectsAndTechsCount"
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes"
import ProjectCard from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import MagicButton from "@/components/ui/magic-button"
import { Projects } from "@prisma/client"
import Image from "next/image"
import { FaArrowRight } from "react-icons/fa"
import { IoCopyOutline } from "react-icons/io5"

const ProjectsDemo = async({projects}:{projects:ProjectsWithTechsType[]}) => {
  const {projectCount,technologyCount}=await getAllProjectsCount()
  return (
    <div className=" w-full h-full relative flex flex-col items-center justify-center bg-slate-100 dark:bg-[#160d1c] px-[20%] max-sm:px-[10%]">
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="font-extrabold text-[40px] tracking-wider">My latest projects</div>
      <p className="pt-10">
        Here are some projects built by me Mohsen Khojasteh Nejad. Feel free
        to check the source code and the live website if available, and do not forget to give the ones you liked a star on GitHub!
      </p>
    </div>
    <div className="w-full h-full  grid grid-cols-2 rounded-[15px] max-lg:grid-cols-1 gap-4 p-4">
    <ProjectCard projects={projects}/>
     
    </div>
    <MagicButton
              title={`Check out all ${projectCount.toString()} projects`}
                icon={<FaArrowRight  />}
                position="right"
                otherClasses="dark:bg-[#161A31] rounded-[12px] bg-white text-black"
              />
             
  </div>
  
  )
}

export default ProjectsDemo