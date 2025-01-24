import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';

export const ProjectsOnTechnologiesDeleteOneSchema = z.object({
  where: ProjectsOnTechnologiesWhereUniqueInputObjectSchema,
});
