import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCountAggregateInputType> =
  z
    .object({
      projectId: z.literal(true).optional(),
      technologyId: z.literal(true).optional(),
      addedAt: z.literal(true).optional(),
      addedBy: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();

export const ProjectsOnTechnologiesCountAggregateInputObjectSchema = Schema;
