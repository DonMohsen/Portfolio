"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";
import Head from "next/head";
import { ProjectSkeleton } from "@/components/Loadings/ProjectSkeleton";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get filters from URL
  const order = searchParams.get("order") || "desc";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const [searchInput, setSearchInput] = useState(search); // Local input state

  const [projects, setProjects] = useState<any[]>([]);
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
  
  // Handle search input change


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
    <div className="bg-white dark:bg-black flex flex-col gap-6">
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
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        {/* Search Input */}
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
        {/* Order Dropdown */}
        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
        </form>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {loading || isPending
          ? [...Array(8)].map((_, i) => <ProjectSkeleton key={i} />)
          : projects.map((project) => (
              <ProjectCardItem project={project} key={project.id} />
            ))}
      </div>
    </div>
  );
}
