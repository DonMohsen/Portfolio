import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    competency: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProjectsSumOrderByAggregateInputObjectSchema = Schema;
