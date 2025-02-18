import { Search, SlidersHorizontal } from "lucide-react";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";
import { getAllProjects } from "../actions/getAllProjects";
import { ProjectTypes } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import { SkeletonLoader } from "@/components/Loadings/skeleton-loader";

interface Props {
  searchParams: Promise<{ order: string ,search:string,type:string}>;
}
export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const order = params?.order || ""; 
  const search = params?.search || "";
  const type = params?.type || "";

  // Fetch projects with the given search parameters
  const allProjects = await getAllProjects(search, order, type);

  return (
    <div className="min-h-[110vh] bg-white dark:bg-black">
      {/* //! The filtering section */}
      <div className="w-full mt-[100px] bg-white dark:bg-black flex flex-col px-[5%] mb-5">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center border border-gray-400 py-2 rounded-full px-2 my-4">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none px-2"
            />
          </div>
          <Link href="/projects?type=Copy" prefetch={true}>
  Copy.......
</Link>
<Link href="/projects?type=Practice" prefetch={true}>
  Practice.......
</Link>
          <SlidersHorizontal className="cursor-pointer hover:scale-125 transition-all duration-300" />
        </div>
        <div className="w-full">
          <p>{allProjects.length} results</p>
        </div>
      </div>

      {/* //! The Cards section */}
      <Suspense fallback={<SkeletonLoader />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white dark:bg-black px-5">
          {allProjects.map((project: any) => (
            <ProjectCardItem project={project} key={project.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

export const dynamic = "force-dynamic"; // ✅ Ensures SSR is always fresh
