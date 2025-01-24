import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    lastUpdatedAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    description: z.literal(true).optional(),
    liveLink: z.literal(true).optional(),
    image: z.literal(true).optional(),
    competency: z.literal(true).optional(),
    projectType: z.literal(true).optional(),
    githubLink: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ProjectsCountAggregateInputObjectSchema = Schema;
