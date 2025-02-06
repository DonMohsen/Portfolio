import { prisma } from "@/lib/prisma";

export const getAllProjects=async ()=>{

    const allProjects = await prisma.projects.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            techStack: {
                include: {
          technology: true,
        },
    },
    _count: true,
},
});
return allProjects
}