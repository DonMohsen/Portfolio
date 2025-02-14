import ProjectsList from "@/components/project-list";
import { getProjects } from "@/lib/getProjects";
import { Suspense } from "react";
interface Props {
  searchParams: Promise<{ order: string ,search:string}>;
}
export default async function TestPage(props: Props) {
  // Get data from the database or API
  const searchParams = await props.searchParams;

  const {
    order,search
  } = searchParams;

  const projects = await getProjects(order, search);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {/* Filter & List inside Suspense for loading effect */}
      <Suspense fallback={<SkeletonLoader />}>
        <ProjectsList initialProjects={projects} />
      </Suspense>
    </main>
  );
}

// Example Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 h-40 rounded-md animate-pulse"></div>
      ))}
    </div>
  );
}
