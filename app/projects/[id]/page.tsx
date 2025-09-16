import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getProjectById } from "@/app/actions/getProjectById";
import Image from "next/image";
import ProjectDetails from "@/components/Projects/project-details";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export const revalidate = 600
export const dynamicParams = true // or false, to 404 on unknown paths

// Generate metadata dynamically (SEO)
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = Number((await params).id)
 
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: project.description,
  };
}

// Fetch project data
export default async function ProjectPage({ params,searchParams }: Props) {
  const projectId=Number((await params).id)

  if (isNaN(projectId)) return notFound();

  const project = await getProjectById(projectId);
  if (!project) return notFound();
  
  return (
    <div className="w-full h-full flex items-center justify-center ">

   <ProjectDetails project={project}/>
    </div>
  );
}