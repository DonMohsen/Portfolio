import React from 'react'

const TestProjects = () => {
  return (
    <div>TestProjects</div>
  )
}

export default TestProjects
// "use client";

// import { useState, useEffect, useTransition } from "react";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// export default function TestProjectsPage() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, startTransition] = useTransition();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Fetch projects on mount & when filters change
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const url = `/api/testProjects?${searchParams.toString()}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       setProjects(data);
//     };

//     startTransition(fetchProjects); // Show skeleton while loading
//   }, [searchParams]);

//   // Function to update filters dynamically
//   const updateFilter = (name: string, value: string | null) => {
//     const params = new URLSearchParams(searchParams);

//     if (value) {
//       params.set(name, value);
//     } else {
//       params.delete(name);
//     }

//     router.push(`${pathname}?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Test Projects</h1>

//       {/* Filter Form */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//         className="space-y-4"
//       >
//         <div>
//           <label>Min Competency:</label>
//           <input
//             type="number"
//             onChange={(e) => updateFilter("mincompetency", e.target.value || null)}
//             defaultValue={searchParams.get("mincompetency") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Max Competency:</label>
//           <input
//             type="number"
//             onChange={(e) => updateFilter("maxcompetency", e.target.value || null)}
//             defaultValue={searchParams.get("maxcompetency") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Type:</label>
//           <select
//             onChange={(e) => updateFilter("type", e.target.value || null)}
//             defaultValue={searchParams.get("type") || ""}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">All</option>
//             <option value="real">Real</option>
//             <option value="demo">Demo</option>
//           </select>
//         </div>

//         <div>
//           <label>Created At (Min):</label>
//           <input
//             type="date"
//             onChange={(e) => updateFilter("createdatmin", e.target.value || null)}
//             defaultValue={searchParams.get("createdatmin") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Created At (Max):</label>
//           <input
//             type="date"
//             onChange={(e) => updateFilter("createdatmax", e.target.value || null)}
//             defaultValue={searchParams.get("createdatmax") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       </form>

//       {/* Projects List with Skeleton Loader */}
//       <div className="mt-6">
//         {loading ? (
//         //   <Skeleton count={5} height={50} />
//         <div>
//             loading......................
//             </div>
//         ) : (
//           projects.map((project) => (
//             <div key={project.id} className="border p-4 rounded shadow mb-2">
//               <h2 className="text-lg font-semibold">{project.name}</h2>
//               <p>Competency: {project.competency}</p>
//               <p>Type: {project.type}</p>
//               <p>Created At: {project.createdAt}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
//!............................
// "use client";

// import { useState, useEffect, useTransition, Suspense } from "react";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// const ProjectsList = ({ searchParams }: { searchParams: URLSearchParams }) => {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, startTransition] = useTransition();

//   // Fetch projects on mount & when filters change
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const url = `/api/testProjects?${searchParams.toString()}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       setProjects(data);
//     };

//     startTransition(fetchProjects); // Show skeleton while loading
//   }, [searchParams]);

//   return (
//     <div className="mt-6">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         projects.map((project) => (
//           <div key={project.id} className="border p-4 rounded shadow mb-2">
//             <h2 className="text-lg font-semibold">{project.name}</h2>
//             <p>Competency: {project.competency}</p>
//             <p>Type: {project.type}</p>
//             <p>Created At: {project.createdAt}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default function TestProjectsPage() {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Function to update filters dynamically
//   const updateFilter = (name: string, value: string | null) => {
//     const params = new URLSearchParams(searchParams);

//     if (value) {
//       params.set(name, value);
//     } else {
//       params.delete(name);
//     }

//     router.push(`${pathname}?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Test Projects</h1>

//       {/* Filter Form */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//         className="space-y-4"
//       >
//         <div>
//           <label>Min Competency:</label>
//           <input
//             type="number"
//             onChange={(e) => updateFilter("mincompetency", e.target.value || null)}
//             defaultValue={searchParams.get("mincompetency") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Max Competency:</label>
//           <input
//             type="number"
//             onChange={(e) => updateFilter("maxcompetency", e.target.value || null)}
//             defaultValue={searchParams.get("maxcompetency") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Type:</label>
//           <select
//             onChange={(e) => updateFilter("type", e.target.value || null)}
//             defaultValue={searchParams.get("type") || ""}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">All</option>
//             <option value="real">Real</option>
//             <option value="demo">Demo</option>
//           </select>
//         </div>

//         <div>
//           <label>Created At (Min):</label>
//           <input
//             type="date"
//             onChange={(e) => updateFilter("createdatmin", e.target.value || null)}
//             defaultValue={searchParams.get("createdatmin") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div>
//           <label>Created At (Max):</label>
//           <input
//             type="date"
//             onChange={(e) => updateFilter("createdatmax", e.target.value || null)}
//             defaultValue={searchParams.get("createdatmax") || ""}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       </form>

//       {/* Projects List with Suspense for loading state */}
//       <Suspense fallback={<div>Loading...</div>}>
//         <ProjectsList searchParams={searchParams} />
//       </Suspense>
//     </div>
//   );
// }
