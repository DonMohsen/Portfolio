import { prisma } from "@/lib/prisma";

export const getAllProjects=async (search:string,order:string)=>{

    const allProjects = await prisma.projects.findMany({
        where: {
            OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive", // Case-insensitive search
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
          },
          include: {
            techStack: {
              include: {
                technology: true,
              },
            },
          },
          orderBy: {
            createdAt: order==="asc"?"asc":"desc", // Assuming `createdAt` is a valid field for ordering
          },
        });
    
return allProjects
}