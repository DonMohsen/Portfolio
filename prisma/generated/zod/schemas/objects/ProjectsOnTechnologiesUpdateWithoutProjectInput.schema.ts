import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TechnologyUpdateOneRequiredWithoutProjectsNestedInputObjectSchema } from './TechnologyUpdateOneRequiredWithoutProjectsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateWithoutProjectInput> =
  z
    .object({
      addedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      addedBy: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      technology: z
        .lazy(
          () =>
            TechnologyUpdateOneRequiredWithoutProjectsNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateWithoutProjectInputObjectSchema =
  Schema;
