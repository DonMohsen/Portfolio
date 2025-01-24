import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    lastUpdatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    liveLink: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    competency: z.lazy(() => SortOrderSchema).optional(),
    projectType: z.lazy(() => SortOrderSchema).optional(),
    githubLink: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProjectsCountOrderByAggregateInputObjectSchema = Schema;
