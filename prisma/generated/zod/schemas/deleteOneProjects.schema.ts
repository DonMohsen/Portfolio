import { z } from 'zod';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';

export const ProjectsDeleteOneSchema = z.object({
  where: ProjectsWhereUniqueInputObjectSchema,
});
