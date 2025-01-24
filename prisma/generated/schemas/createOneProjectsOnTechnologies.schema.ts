import { z } from 'zod';
import { ProjectsOnTechnologiesCreateInputObjectSchema } from './objects/ProjectsOnTechnologiesCreateInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateInputObjectSchema } from './objects/ProjectsOnTechnologiesUncheckedCreateInput.schema';

export const ProjectsOnTechnologiesCreateOneSchema = z.object({
  data: z.union([
    ProjectsOnTechnologiesCreateInputObjectSchema,
    ProjectsOnTechnologiesUncheckedCreateInputObjectSchema,
  ]),
});
