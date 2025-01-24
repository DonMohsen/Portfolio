import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProjectsOnTechnologiesUpdateManyWithoutTechnologyNestedInputObjectSchema } from './ProjectsOnTechnologiesUpdateManyWithoutTechnologyNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyUpdateInput> = z
  .object({
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    imageUrl: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    projects: z
      .lazy(
        () =>
          ProjectsOnTechnologiesUpdateManyWithoutTechnologyNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const TechnologyUpdateInputObjectSchema = Schema;
