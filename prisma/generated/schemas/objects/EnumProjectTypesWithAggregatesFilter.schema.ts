import { z } from 'zod';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';
import { NestedEnumProjectTypesWithAggregatesFilterObjectSchema } from './NestedEnumProjectTypesWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumProjectTypesFilterObjectSchema } from './NestedEnumProjectTypesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumProjectTypesWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumProjectTypesWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumProjectTypesFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumProjectTypesFilterObjectSchema).optional(),
  })
  .strict();

export const EnumProjectTypesWithAggregatesFilterObjectSchema = Schema;
