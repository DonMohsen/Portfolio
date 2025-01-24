import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProjectsCountOrderByAggregateInputObjectSchema } from './ProjectsCountOrderByAggregateInput.schema';
import { ProjectsAvgOrderByAggregateInputObjectSchema } from './ProjectsAvgOrderByAggregateInput.schema';
import { ProjectsMaxOrderByAggregateInputObjectSchema } from './ProjectsMaxOrderByAggregateInput.schema';
import { ProjectsMinOrderByAggregateInputObjectSchema } from './ProjectsMinOrderByAggregateInput.schema';
import { ProjectsSumOrderByAggregateInputObjectSchema } from './ProjectsSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    lastUpdatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    liveLink: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    competency: z.lazy(() => SortOrderSchema).optional(),
    projectType: z.lazy(() => SortOrderSchema).optional(),
    githubLink: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ProjectsCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => ProjectsAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ProjectsMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ProjectsMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ProjectsSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ProjectsOrderByWithAggregationInputObjectSchema = Schema;
