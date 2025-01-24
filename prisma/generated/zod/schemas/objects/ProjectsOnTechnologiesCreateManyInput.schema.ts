import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateManyInput> = z
  .object({
    projectId: z.number(),
    technologyId: z.number(),
    addedAt: z.coerce.date().optional(),
    addedBy: z.string(),
  })
  .strict();

export const ProjectsOnTechnologiesCreateManyInputObjectSchema = Schema;
