import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes"
import ProjectCardItem from "@/components/Projects/ProjectCardItem"
import MagicButton from "@/components/ui/magic-button"
import { toPersianDigits } from "@/utils/format"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const ProjectsDemo = ({
  projects,
  locale,
  projectCount
}: {
  projects: ProjectsWithTechsType[];
  locale: string;
  projectCount: number;
}) => {
  const isFa = locale === "fa";
  return (
    <div className=" w-full h-full relative flex flex-col items-center justify-center bg-white dark:bg-black">
    <div className="w-full h-full flex flex-col  text-center">
    <div className=" flex items-center justify-end  px-4 py-2">
        <div className="relative">
          <p className="font-IRANSansXExtraBold text-[40px] text-right">
            {isFa ? "پروژه ها" : "Projects"}
          </p>
          <div className="w-[70%] h-[3px] absolute bottom-0 translate-y-2 right-0 bg-[#5c416e] rounded-full"></div>
        </div>
      </div>      <p className="pt-10 px-10 max-md:p-5 font-IRANSansXUltraLight">
        {isFa
          ? "در این بخش پروژه های تمرینی، کپی شده و حتی واقعی من را میتونید مشاهده کنید که اکثرا اوپن سورس و لایو هستند"
          : "Here you can explore my practice, copied and production projects. Most of them are open-source and live."}
        </p>
    </div>
    <div className="w-full h-full mt-5 grid grid-cols-2 rounded-[15px] max-lg:grid-cols-1 gap-4" dir={isFa ? "rtl" : "ltr"}>
      {projects.map((project)=>
    <ProjectCardItem project={project} key={project.id}/>
      )}
     
    </div>
    <Link href={`/${locale}/projects`} className="font-IRANSansXExtraBold mt-5" >
    <MagicButton 
              title={
                isFa
                  ? ` هر ${toPersianDigits( projectCount)}  پروژه را ببینید `
                  : `See all ${projectCount} projects`
              }
              icon={<ArrowRight />}
              position="right"
              otherClasses="dark:bg-[#161A31] rounded-[12px] bg-white text-black "
              />
              </Link>
             
  </div>
  
  )
};

export default ProjectsDemo