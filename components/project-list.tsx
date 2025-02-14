"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectsList({ initialProjects }: { initialProjects: { id: number; name: string }[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newOrder = searchParams.get("order") || "asc";
    const newSearch = searchParams.get("search") || "";

    setOrder(newOrder);
    
    setSearch(newSearch);
  }, [searchParams]);

  const handleSearch = async () => {
    const query = new URLSearchParams({ order, search }).toString();
    router.push(`/projects?${query}`);

    startTransition(async () => {
      const res = await fetch(`/api/projects?${query}`);
      const data = await res.json();
      setProjects(data);
    });
  };

  return (
    <div>
      {/* Filter UI */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={order} onChange={(e) => setOrder(e.target.value)} className="border p-2 rounded">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* Loading State */}
      {loading && <SkeletonLoader />}

      {/* Display Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded shadow">
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton Loader (for client-side fetching)
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 h-40 rounded-md animate-pulse"></div>
      ))}
    </div>
  );
}
