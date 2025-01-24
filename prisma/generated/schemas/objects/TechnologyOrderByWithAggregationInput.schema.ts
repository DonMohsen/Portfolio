import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TechnologyCountOrderByAggregateInputObjectSchema } from './TechnologyCountOrderByAggregateInput.schema';
import { TechnologyAvgOrderByAggregateInputObjectSchema } from './TechnologyAvgOrderByAggregateInput.schema';
import { TechnologyMaxOrderByAggregateInputObjectSchema } from './TechnologyMaxOrderByAggregateInput.schema';
import { TechnologyMinOrderByAggregateInputObjectSchema } from './TechnologyMinOrderByAggregateInput.schema';
import { TechnologySumOrderByAggregateInputObjectSchema } from './TechnologySumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    imageUrl: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => TechnologyCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => TechnologyAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => TechnologyMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => TechnologyMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => TechnologySumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const TechnologyOrderByWithAggregationInputObjectSchema = Schema;
