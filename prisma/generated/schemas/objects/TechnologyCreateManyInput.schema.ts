import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyCreateManyInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    imageUrl: z.string(),
  })
  .strict();

export const TechnologyCreateManyInputObjectSchema = Schema;
