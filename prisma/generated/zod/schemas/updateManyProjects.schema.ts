import { z } from 'zod';
import { ProjectsUpdateManyMutationInputObjectSchema } from './objects/ProjectsUpdateManyMutationInput.schema';
import { ProjectsWhereInputObjectSchema } from './objects/ProjectsWhereInput.schema';

export const ProjectsUpdateManySchema = z.object({
  data: ProjectsUpdateManyMutationInputObjectSchema,
  where: ProjectsWhereInputObjectSchema.optional(),
});
