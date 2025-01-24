import { z } from 'zod';
import { ProjectsUpdateInputObjectSchema } from './objects/ProjectsUpdateInput.schema';
import { ProjectsUncheckedUpdateInputObjectSchema } from './objects/ProjectsUncheckedUpdateInput.schema';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';

export const ProjectsUpdateOneSchema = z.object({
  data: z.union([
    ProjectsUpdateInputObjectSchema,
    ProjectsUncheckedUpdateInputObjectSchema,
  ]),
  where: ProjectsWhereUniqueInputObjectSchema,
});
