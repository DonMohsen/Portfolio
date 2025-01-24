import { z } from 'zod';
import { TechnologyCreateNestedOneWithoutProjectsInputObjectSchema } from './TechnologyCreateNestedOneWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateWithoutProjectInput> =
  z
    .object({
      addedAt: z.coerce.date().optional(),
      addedBy: z.string(),
      technology: z.lazy(
        () => TechnologyCreateNestedOneWithoutProjectsInputObjectSchema,
      ),
    })
    .strict();

export const ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema =
  Schema;
