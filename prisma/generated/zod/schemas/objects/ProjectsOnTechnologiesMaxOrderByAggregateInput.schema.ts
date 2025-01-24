import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesMaxOrderByAggregateInput> =
  z
    .object({
      projectId: z.lazy(() => SortOrderSchema).optional(),
      technologyId: z.lazy(() => SortOrderSchema).optional(),
      addedAt: z.lazy(() => SortOrderSchema).optional(),
      addedBy: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProjectsOnTechnologiesMaxOrderByAggregateInputObjectSchema =
  Schema;
