import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    competency: z.literal(true).optional(),
  })
  .strict();

export const ProjectsAvgAggregateInputObjectSchema = Schema;
