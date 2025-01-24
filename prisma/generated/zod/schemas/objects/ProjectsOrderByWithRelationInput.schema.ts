import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProjectsOnTechnologiesOrderByRelationAggregateInputObjectSchema } from './ProjectsOnTechnologiesOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOrderByWithRelationInput> = z
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
    techStack: z
      .lazy(
        () => ProjectsOnTechnologiesOrderByRelationAggregateInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ProjectsOrderByWithRelationInputObjectSchema = Schema;
