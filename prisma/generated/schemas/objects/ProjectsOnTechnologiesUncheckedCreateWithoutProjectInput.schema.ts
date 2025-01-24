import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUncheckedCreateWithoutProjectInput> =
  z
    .object({
      technologyId: z.number(),
      addedAt: z.coerce.date().optional(),
      addedBy: z.string(),
    })
    .strict();

export const ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema =
  Schema;
