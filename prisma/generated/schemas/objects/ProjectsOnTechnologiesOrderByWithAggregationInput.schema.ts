import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectsOnTechnologiesCountOrderByAggregateInputObjectSchema } from './ProjectsOnTechnologiesCountOrderByAggregateInput.schema';
import { ProjectsOnTechnologiesAvgOrderByAggregateInputObjectSchema } from './ProjectsOnTechnologiesAvgOrderByAggregateInput.schema';
import { ProjectsOnTechnologiesMaxOrderByAggregateInputObjectSchema } from './ProjectsOnTechnologiesMaxOrderByAggregateInput.schema';
import { ProjectsOnTechnologiesMinOrderByAggregateInputObjectSchema } from './ProjectsOnTechnologiesMinOrderByAggregateInput.schema';
import { ProjectsOnTechnologiesSumOrderByAggregateInputObjectSchema } from './ProjectsOnTechnologiesSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesOrderByWithAggregationInput> =
  z
    .object({
      projectId: z.lazy(() => SortOrderSchema).optional(),
      technologyId: z.lazy(() => SortOrderSchema).optional(),
      addedAt: z.lazy(() => SortOrderSchema).optional(),
      addedBy: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(
          () => ProjectsOnTechnologiesCountOrderByAggregateInputObjectSchema,
        )
        .optional(),
      _avg: z
        .lazy(() => ProjectsOnTechnologiesAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => ProjectsOnTechnologiesMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => ProjectsOnTechnologiesMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => ProjectsOnTechnologiesSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesOrderByWithAggregationInputObjectSchema =
  Schema;
