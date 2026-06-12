import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

export type ProjectDetail = ProjectsWithTechsType & {
  slug: string;
  summary: string;
  longDescription: string;
  highlights: string[];
  role: string;
  year: number;
  images: string[];
  seoKeywords: string[];
};
