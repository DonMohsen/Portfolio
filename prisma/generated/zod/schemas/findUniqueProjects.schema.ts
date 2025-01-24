import { z } from 'zod';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';

export const ProjectsFindUniqueSchema = z.object({
  where: ProjectsWhereUniqueInputObjectSchema,
});
