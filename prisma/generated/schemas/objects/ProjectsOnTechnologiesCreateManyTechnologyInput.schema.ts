import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateManyTechnologyInput> =
  z
    .object({
      projectId: z.number(),
      addedAt: z.coerce.date().optional(),
      addedBy: z.string(),
    })
    .strict();

export const ProjectsOnTechnologiesCreateManyTechnologyInputObjectSchema =
  Schema;
