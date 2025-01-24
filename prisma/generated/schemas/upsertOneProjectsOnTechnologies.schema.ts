import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesCreateInputObjectSchema } from './objects/ProjectsOnTechnologiesCreateInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateInputObjectSchema } from './objects/ProjectsOnTechnologiesUncheckedCreateInput.schema';
import { ProjectsOnTechnologiesUpdateInputObjectSchema } from './objects/ProjectsOnTechnologiesUpdateInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateInputObjectSchema } from './objects/ProjectsOnTechnologiesUncheckedUpdateInput.schema';

export const ProjectsOnTechnologiesUpsertSchema = z.object({
  where: ProjectsOnTechnologiesWhereUniqueInputObjectSchema,
  create: z.union([
    ProjectsOnTechnologiesCreateInputObjectSchema,
    ProjectsOnTechnologiesUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ProjectsOnTechnologiesUpdateInputObjectSchema,
    ProjectsOnTechnologiesUncheckedUpdateInputObjectSchema,
  ]),
});
