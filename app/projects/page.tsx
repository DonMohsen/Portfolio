import axios from "axios";
import { ProjectsWithTechsType } from "../Types/AllTechstackTypes"
import { prisma } from "@/lib/prisma";

export const revalidate=600

export async function generateStaticParams() {
    const allProjects = await prisma.projects.findMany({
              orderBy: {
                createdAt: 'desc',
              },
              include:{
                techStack:{
                  include:{
                    technology:true
                  }
                },
                _count:true,
              },
            })
                return  allProjects.map((project)=>({
                    project

                }))
        }
const ProjectsPage = () => {
    // console.log(projects);
    
  return (
    <div>
    </div>
  )
}

export default ProjectsPage