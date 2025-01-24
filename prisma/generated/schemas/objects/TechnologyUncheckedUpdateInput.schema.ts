import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechnologyNestedInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechnologyNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyUncheckedUpdateInput> = z
  .object({
    id: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
          ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechnologyNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const TechnologyUncheckedUpdateInputObjectSchema = Schema;
