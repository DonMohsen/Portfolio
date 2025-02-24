import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getProjectById } from "@/app/actions/getProjectById";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
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
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <p className="mt-2 text-lg opacity-90">{project.description}</p>
      </section>

      {/* Tech Stack */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-3 mt-4">
          {project.techStack.map(({ technology }) => (
            <div
              key={technology.id}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
            >
              <Image
                src={technology.imageUrl}
                alt={technology.name}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-gray-800 font-medium">{technology.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Project Metadata */}
      <section className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-semibold">Project Details</h2>
        <ul className="mt-4 text-gray-700 space-y-2">
          <li><strong>Tech Stack Count:</strong> {project._count.techStack}</li>
          <li><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</li>
        </ul>
      </section>
    </main>
  );
}
// import type { Metadata, ResolvingMetadata } from 'next'
 
// type Props = {
//   params: Promise<{ id: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }
 
// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).id
 
//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }
 
// export default function Page({ params, searchParams }: Props) {}