import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema),
        z
          .lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema),
        z
          .lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    projectId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    technologyId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    addedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    addedBy: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const ProjectsOnTechnologiesScalarWhereInputObjectSchema = Schema;
