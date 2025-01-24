import { z } from 'zod';
import { ProjectsWhereInputObjectSchema } from './objects/ProjectsWhereInput.schema';

export const ProjectsDeleteManySchema = z.object({
  where: ProjectsWhereInputObjectSchema.optional(),
});
