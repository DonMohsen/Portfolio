import { z } from 'zod';
import { ProjectsOnTechnologiesCreateManyInputObjectSchema } from './objects/ProjectsOnTechnologiesCreateManyInput.schema';

export const ProjectsOnTechnologiesCreateManySchema = z.object({
  data: z.union([
    ProjectsOnTechnologiesCreateManyInputObjectSchema,
    z.array(ProjectsOnTechnologiesCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
