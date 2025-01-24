import { Prisma } from "@prisma/client";

export type AllTechstackType={
    id:number ,
    src:string,
    name:string
}
export type ProjectsWithTechsType = Prisma.ProjectsGetPayload<{
    include: {
      techStack: {
        include: {
          technology: true; // Include the full Technology model
        };
      },
      _count:true;
    };
  }>;
  
