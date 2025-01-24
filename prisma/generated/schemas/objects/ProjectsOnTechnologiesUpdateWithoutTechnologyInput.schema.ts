import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProjectsUpdateOneRequiredWithoutTechStackNestedInputObjectSchema } from './ProjectsUpdateOneRequiredWithoutTechStackNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateWithoutTechnologyInput> =
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
      project: z
        .lazy(
          () =>
            ProjectsUpdateOneRequiredWithoutTechStackNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateWithoutTechnologyInputObjectSchema =
  Schema;
