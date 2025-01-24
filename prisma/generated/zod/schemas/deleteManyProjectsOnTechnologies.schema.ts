import { z } from 'zod';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereInput.schema';

export const ProjectsOnTechnologiesDeleteManySchema = z.object({
  where: ProjectsOnTechnologiesWhereInputObjectSchema.optional(),
});
