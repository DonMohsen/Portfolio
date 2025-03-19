"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";
import Head from "next/head";
import { ProjectSkeleton } from "@/components/Loadings/ProjectSkeleton";
import { Button } from "@/components/ui/button";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Search, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get filters from URL
  const order = searchParams.get("order") || "desc";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const [searchInput, setSearchInput] = useState(search); // Local input state

  const [projects, setProjects] = useState<ProjectsWithTechsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Fetch projects when filters change
  useEffect(() => {
    setLoading(true);
    startTransition(() => {
      fetch(`/api/project?search=${search}&order=${order}&type=${type}`)
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching projects:", err);
          setLoading(false);
        });
    });
  }, [search, order, type]);
  useEffect(() => {
  setSearchInput(search||"")
  }, [searchParams])
  

  // Handle order change
  const handleOrderChange = (newOrder: string) => {
    updateFilters({ order: newOrder });
  };

  // Update URL and filters
  const updateFilters = (
    newFilters: Partial<{ type: string; order: string; search: string }>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col  ">
      <Head>
        <title>Projects - My Portfolio</title>
        <meta
          name="description"
          content="Browse projects in different categories like Practice and Copy."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Projects - My Portfolio" />
        <meta
          property="og:description"
          content="Explore a variety of projects including Practice and Copy categories."
        />
        <meta property="og:url" content="https://yourwebsite.com/projects" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Filters UI */}
      <div className="w-full  flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-between">
      <div className="flex items-center border border-gray-400 py-2 rounded-full px-2 my-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none outline-none px-2 "
        />
      </div>
    
      <SlidersHorizontal className="cursor-pointer hover:scale-125 transition-all duration-300 lg:hidden" />
    </div>
    <form
          className="flex items-center justify-start w-full"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page refresh
            updateFilters({ search: searchInput }); // Updates search only on button click
          }}
        >
        
    
        </form>
        <div className="flex gap-2 items-center justify-start w-full">
      <button
        onClick={() => handleOrderChange("desc")}
        className={`p-2 rounded font-IRANSansXDemiBold transition-colors ${
          order === "desc" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        جدید ترین
      </button>
      <button
        onClick={() => handleOrderChange("asc")}
        className={`p-2 rounded font-IRANSansXDemiBold transition-colors ${
          order === "asc" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        قدیمی ترین
      </button>
    </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page refresh
            updateFilters({ search: searchInput }); // Updates search only on button click
          }}
        >
          <input
            type="text"
            placeholder="Search projects..."
            value={searchInput||''}
            onChange={(e) => setSearchInput(e.target.value)} // Store input locally
            className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full"
          />
          <Button
            type="submit"
            className="font-IRANSansXRegular border rounded-xl"
          >
            جستجو
          </Button>
        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
        </form>
       
       

      </div> */}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 mt-5">
        {loading || isPending
          ? [...Array(8)].map((_, i) => <ProjectSkeleton key={i} />)
          : projects.map((project) => (
              <ProjectCardItem project={project} key={project.id} />
            ))}
      </div>
    </div>
  );
}
