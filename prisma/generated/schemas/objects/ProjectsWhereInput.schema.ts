import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumProjectTypesFilterObjectSchema } from './EnumProjectTypesFilter.schema';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';
import { ProjectsOnTechnologiesListRelationFilterObjectSchema } from './ProjectsOnTechnologiesListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProjectsWhereInputObjectSchema),
        z.lazy(() => ProjectsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProjectsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProjectsWhereInputObjectSchema),
        z.lazy(() => ProjectsWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    lastUpdatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    liveLink: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    competency: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    projectType: z
      .union([
        z.lazy(() => EnumProjectTypesFilterObjectSchema),
        z.lazy(() => ProjectTypesSchema),
      ])
      .optional(),
    githubLink: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    techStack: z
      .lazy(() => ProjectsOnTechnologiesListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();

export const ProjectsWhereInputObjectSchema = Schema;
