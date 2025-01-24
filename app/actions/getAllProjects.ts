import { Prisma, PrismaClient, Projects } from "@prisma/client";
import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";

const prisma = new PrismaClient();

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
