import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic"; // ✅ Ensures the page is always fresh (SSR)

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