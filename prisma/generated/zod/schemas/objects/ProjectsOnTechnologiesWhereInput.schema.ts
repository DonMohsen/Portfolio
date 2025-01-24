import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ProjectsRelationFilterObjectSchema } from './ProjectsRelationFilter.schema';
import { ProjectsWhereInputObjectSchema } from './ProjectsWhereInput.schema';
import { TechnologyRelationFilterObjectSchema } from './TechnologyRelationFilter.schema';
import { TechnologyWhereInputObjectSchema } from './TechnologyWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema),
        z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema),
        z.lazy(() => ProjectsOnTechnologiesWhereInputObjectSchema).array(),
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
    project: z
      .union([
        z.lazy(() => ProjectsRelationFilterObjectSchema),
        z.lazy(() => ProjectsWhereInputObjectSchema),
      ])
      .optional(),
    technology: z
      .union([
        z.lazy(() => TechnologyRelationFilterObjectSchema),
        z.lazy(() => TechnologyWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ProjectsOnTechnologiesWhereInputObjectSchema = Schema;
