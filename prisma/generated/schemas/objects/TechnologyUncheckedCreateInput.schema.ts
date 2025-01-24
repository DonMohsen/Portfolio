import { z } from 'zod';
import { ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    imageUrl: z.string(),
    projects: z
      .lazy(
        () =>
          ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutTechnologyInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const TechnologyUncheckedCreateInputObjectSchema = Schema;
