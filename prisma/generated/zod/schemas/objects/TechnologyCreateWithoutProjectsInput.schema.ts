import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyCreateWithoutProjectsInput> = z
  .object({
    name: z.string(),
    imageUrl: z.string(),
  })
  .strict();

export const TechnologyCreateWithoutProjectsInputObjectSchema = Schema;
