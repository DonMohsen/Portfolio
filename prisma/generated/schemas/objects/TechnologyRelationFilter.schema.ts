import { z } from 'zod';
import { TechnologyWhereInputObjectSchema } from './TechnologyWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyRelationFilter> = z
  .object({
    is: z
      .lazy(() => TechnologyWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => TechnologyWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TechnologyRelationFilterObjectSchema = Schema;
