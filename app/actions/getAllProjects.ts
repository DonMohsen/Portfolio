import { Prisma,  Projects } from "@prisma/client";
import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";
import { prisma } from "@/lib/prisma";



export async function getAllProjects(): Promise<ProjectsWithTechsType[]> {
  try {
    const projects = await prisma.projects.findMany({
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
      });
      return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}
