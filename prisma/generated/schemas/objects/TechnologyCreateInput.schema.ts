import { z } from 'zod';
import { ProjectsOnTechnologiesCreateNestedManyWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateNestedManyWithoutTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyCreateInput> = z
  .object({
    name: z.string(),
    imageUrl: z.string(),
    projects: z
      .lazy(
        () =>
          ProjectsOnTechnologiesCreateNestedManyWithoutTechnologyInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const TechnologyCreateInputObjectSchema = Schema;
