import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';

export const ProjectsOnTechnologiesFindUniqueSchema = z.object({
  where: ProjectsOnTechnologiesWhereUniqueInputObjectSchema,
});
