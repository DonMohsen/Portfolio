import getAllProjectsCount from "@/app/actions/getProjectsAndTechsCount"
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes"
import ProjectCard from "@/components/ProjectCard"
import ProjectCardItem from "@/components/Projects/ProjectCardItem"
import { Button } from "@/components/ui/button"
import MagicButton from "@/components/ui/magic-button"
import { toPersianDigits } from "@/utils/format"
import { Projects } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { IoCopyOutline } from "react-icons/io5"

const ProjectsDemo = async({projects}:{projects:ProjectsWithTechsType[]}) => {
  const {projectCount,technologyCount}=await getAllProjectsCount()
  return (
    <div className=" w-full h-full relative flex flex-col items-center justify-center bg-white dark:bg-black px-[20%] max-sm:px-[10%]">
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className=" text-[40px]  font-IRANSansXExtraBold">پروژه ها</div>
      <p className="pt-10 font-IRANSansXUltraLight">
در این قسمت بخشی از پروژه های من رو میتونید ببینید. برای مشاهده همه پروژه ها روی دکمه ی پایین کلیک کنین. اکثر پروژه ها بصورت عمومی در گیت هاب موجود هستن، اگه خوشتون اومد لطفا ستاره یادتون نره     </p>
    </div>
    <div className="w-full h-full  grid grid-cols-2 rounded-[15px] max-lg:grid-cols-1 gap-4 p-4">
      {projects.map((project)=>
    <ProjectCardItem project={project}/>
      )}
     
    </div>
    <Link href="/projects" className="font-IRANSansXExtraBold" >
    <MagicButton 
              title={` هر ${toPersianDigits( projectCount)}  پروژه را ببینید `}
              icon={<FaArrowRight  />}
              position="right"
              otherClasses="dark:bg-[#161A31] rounded-[12px] bg-white text-black "
              />
              </Link>
             
  </div>
  
  )
}

export default ProjectsDemo