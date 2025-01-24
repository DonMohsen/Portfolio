import { z } from 'zod';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './ProjectsOnTechnologiesWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesListRelationFilter> = z
  .object({
    every: z
      .lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema)
      .optional(),
    some: z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema).optional(),
    none: z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema).optional(),
  })
  .strict();

export const ProjectsOnTechnologiesListRelationFilterObjectSchema = Schema;
