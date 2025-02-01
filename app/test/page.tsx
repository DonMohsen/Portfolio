import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export type ProjectsWithTechsType = Prisma.ProjectsGetPayload<{
  include: {
    techStack: {
      include: {
        technology: true;
      };
    };
    _count: true;
  };
}>;

type ProjectsPageProps = {
  projects: ProjectsWithTechsType[];
};

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
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>
      <ul>
        {allProjects.map((project) => (
          <li key={project.id} className="p-4 border-b">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p>{project.description}</p>
            <div className="flex gap-2 mt-2">
              {project.techStack.map(({ technology }) => (
                <span key={technology.id} className="px-2 py-1 bg-gray-200 rounded">
                  {technology.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
