import { z } from 'zod';
import { ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema } from './objects/ProjectsOnTechnologiesUpdateManyMutationInput.schema';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereInput.schema';

export const ProjectsOnTechnologiesUpdateManySchema = z.object({
  data: ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema,
  where: ProjectsOnTechnologiesWhereInputObjectSchema.optional(),
});
