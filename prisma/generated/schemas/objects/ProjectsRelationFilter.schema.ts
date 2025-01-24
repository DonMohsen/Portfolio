import { z } from 'zod';
import { ProjectsWhereInputObjectSchema } from './ProjectsWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProjectsWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProjectsWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ProjectsRelationFilterObjectSchema = Schema;
