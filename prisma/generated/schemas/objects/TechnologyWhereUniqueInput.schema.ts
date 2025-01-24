import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
  })
  .strict();

export const TechnologyWhereUniqueInputObjectSchema = Schema;
