import ClientProjectCard from "@/components/Projects/client-project-card";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  // Fetch data directly within the component
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

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <ClientProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  
}
export const revalidate = 600; // Revalidate every 600 seconds (10 minutes)