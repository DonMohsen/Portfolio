import { z } from 'zod';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';
import { ProjectsCreateInputObjectSchema } from './objects/ProjectsCreateInput.schema';
import { ProjectsUncheckedCreateInputObjectSchema } from './objects/ProjectsUncheckedCreateInput.schema';
import { ProjectsUpdateInputObjectSchema } from './objects/ProjectsUpdateInput.schema';
import { ProjectsUncheckedUpdateInputObjectSchema } from './objects/ProjectsUncheckedUpdateInput.schema';

export const ProjectsUpsertSchema = z.object({
  where: ProjectsWhereUniqueInputObjectSchema,
  create: z.union([
    ProjectsCreateInputObjectSchema,
    ProjectsUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ProjectsUpdateInputObjectSchema,
    ProjectsUncheckedUpdateInputObjectSchema,
  ]),
});
