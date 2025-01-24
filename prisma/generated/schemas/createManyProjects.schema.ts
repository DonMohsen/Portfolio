import { z } from 'zod';
import { ProjectsCreateManyInputObjectSchema } from './objects/ProjectsCreateManyInput.schema';

export const ProjectsCreateManySchema = z.object({
  data: z.union([
    ProjectsCreateManyInputObjectSchema,
    z.array(ProjectsCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
