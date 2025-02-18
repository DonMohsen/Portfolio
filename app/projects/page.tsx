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
    <div className=" bg-white dark:bg-black">
      {/* //! The filtering section */}

      {/* //! The Cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 bg-white dark:bg-black ">
          {allProjects.map((project: any) => (
            <ProjectCardItem project={project} key={project.id} />
          ))}
        </div>
    </div>
  );
}

export const dynamic = "force-dynamic"; // ✅ Ensures SSR is always fresh
