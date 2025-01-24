import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    imageUrl: z.literal(true).optional(),
  })
  .strict();

export const TechnologyMinAggregateInputObjectSchema = Schema;
