import { z } from 'zod';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsCreateWithoutTechStackInput> = z
  .object({
    createdAt: z.coerce.date().optional(),
    lastUpdatedAt: z.coerce.date().optional(),
    name: z.string(),
    description: z.string(),
    liveLink: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    competency: z.number(),
    projectType: z.lazy(() => ProjectTypesSchema),
    githubLink: z.string(),
  })
  .strict();

export const ProjectsCreateWithoutTechStackInputObjectSchema = Schema;
