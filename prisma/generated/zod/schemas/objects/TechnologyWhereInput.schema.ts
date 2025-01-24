import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ProjectsOnTechnologiesListRelationFilterObjectSchema } from './ProjectsOnTechnologiesListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TechnologyWhereInputObjectSchema),
        z.lazy(() => TechnologyWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TechnologyWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TechnologyWhereInputObjectSchema),
        z.lazy(() => TechnologyWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    imageUrl: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    projects: z
      .lazy(() => ProjectsOnTechnologiesListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();

export const TechnologyWhereInputObjectSchema = Schema;
