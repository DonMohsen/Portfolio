// import { Prisma,  Projects } from "@prisma/client";
// import { prisma } from "@/lib/prisma";

// export async function getStaticProps() {
//   try {
//     // Fetch all projects
//     const projects = await prisma.projects.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include:{
//         techStack:{
//           include:{
//             technology:true
//           }
//         },
//         _count:true,
//       },
//     });
//     return {
//       props: {
//         projects: JSON.parse(JSON.stringify(projects)), // Convert to JSON for serialization
//       },
//       revalidate: 600, // Optionally revalidate every 60 seconds (ISR)
//     };
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     return {
//       props: {
//         projects: [],
//       },
//     };
//   }
// }


// import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
// type Repo = {
//   name: string
//   stargazers_count: number
// }
 
// export const getStaticProps = (async (context) => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo = await res.json()
//   return { props: { repo } }
// }) satisfies GetStaticProps<{
//   repo: Repo
// }>
 
// export default function Page({
//   repo,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   return repo.stargazers_count
// }
//!.................................

// import type { InferGetStaticPropsType, GetStaticProps } from "next";
// import { prisma } from "@/lib/prisma";
// import { Projects } from "@prisma/client";
// import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";

// // Define types


// type PropsType = {
//   projects: ProjectsWithTechsType[];
// };

// // Fetch data at build time (SSG)
// export const getStaticProps = (async () => {
//   // Fetch projects and include tech stack
//   const projects = await prisma.projects.findMany({
//           orderBy: {
//             createdAt: 'desc',
//           },
//           include:{
//             techStack:{
//               include:{
//                 technology:true
//               }
//             },
//             _count:true,
//           },
//         });

//   // Count total technologies used across all projects

//   return {
//     props: {
//       projects // Serialize for Next.js
//     },
//     revalidate: 600, // ISR: Revalidate every 600 seconds
//   };
// }) satisfies GetStaticProps<PropsType>;

// export default function Page({
//   projects,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   return projects.map((item)=>{item.name})
// }