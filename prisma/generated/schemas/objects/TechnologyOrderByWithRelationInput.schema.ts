import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectsOnTechnologiesOrderByRelationAggregateInputObjectSchema } from './ProjectsOnTechnologiesOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    imageUrl: z.lazy(() => SortOrderSchema).optional(),
    projects: z
      .lazy(
        () => ProjectsOnTechnologiesOrderByRelationAggregateInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const TechnologyOrderByWithRelationInputObjectSchema = Schema;
