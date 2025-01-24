import { z } from 'zod';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumProjectTypesFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => ProjectTypesSchema).optional(),
  })
  .strict();

export const EnumProjectTypesFieldUpdateOperationsInputObjectSchema = Schema;
