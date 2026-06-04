import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getProjectById } from "@/app/actions/getProjectById";
import ProjectDetails from "@/components/Projects/project-details";

type Props = {
  params: Promise<{ id: string; locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const revalidate = 600;
export const dynamicParams = true;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {id, locale} = await params;
  const numericId = Number(id);
  const project = await getProjectById(numericId);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/${locale}/projects/${numericId}`
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const projectId = Number((await params).id);

  if (isNaN(projectId)) return notFound();

  const project = await getProjectById(projectId);
  if (!project) return notFound();

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <ProjectDetails project={project}/>
    </div>
  );
}
