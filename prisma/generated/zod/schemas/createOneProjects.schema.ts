import { z } from 'zod';
import { ProjectsCreateInputObjectSchema } from './objects/ProjectsCreateInput.schema';
import { ProjectsUncheckedCreateInputObjectSchema } from './objects/ProjectsUncheckedCreateInput.schema';

export const ProjectsCreateOneSchema = z.object({
  data: z.union([
    ProjectsCreateInputObjectSchema,
    ProjectsUncheckedCreateInputObjectSchema,
  ]),
});
