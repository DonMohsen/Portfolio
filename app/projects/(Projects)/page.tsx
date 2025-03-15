"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";
import ProjectsFilterNav from "@/components/Projects/projects-filter-nav";
import Head from "next/head";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
  }, [search, order, type]);

  return (
    <div className="bg-white dark:bg-black flex">
      {/* <ProjectsFilterNav /> */}
      <Head>
        <title>Projects - My Portfolio</title>
        <meta name="description" content="Browse projects in different categories like Practice and Copy." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Projects - My Portfolio" />
        <meta property="og:description" content="Explore a variety of projects including Practice and Copy categories." />
        <meta property="og:url" content="https://yourwebsite.com/projects" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
          ))
        ) : (
          projects.map((project: any) => (
            <ProjectCardItem project={project} key={project.id} />
          ))
        )}
      </div>
    </div>
  );
}
