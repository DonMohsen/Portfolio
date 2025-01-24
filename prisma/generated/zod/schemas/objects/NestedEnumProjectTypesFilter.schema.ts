import { z } from 'zod';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumProjectTypesFilter> = z
  .object({
    equals: z.lazy(() => ProjectTypesSchema).optional(),
    in: z
      .union([
        z.lazy(() => ProjectTypesSchema).array(),
        z.lazy(() => ProjectTypesSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => ProjectTypesSchema).array(),
        z.lazy(() => ProjectTypesSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => ProjectTypesSchema),
        z.lazy(() => NestedEnumProjectTypesFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumProjectTypesFilterObjectSchema = Schema;
