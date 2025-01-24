import { z } from 'zod';
import { ProjectsOnTechnologiesUpdateInputObjectSchema } from './objects/ProjectsOnTechnologiesUpdateInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateInputObjectSchema } from './objects/ProjectsOnTechnologiesUncheckedUpdateInput.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';

export const ProjectsOnTechnologiesUpdateOneSchema = z.object({
  data: z.union([
    ProjectsOnTechnologiesUpdateInputObjectSchema,
    ProjectsOnTechnologiesUncheckedUpdateInputObjectSchema,
  ]),
  where: ProjectsOnTechnologiesWhereUniqueInputObjectSchema,
});
