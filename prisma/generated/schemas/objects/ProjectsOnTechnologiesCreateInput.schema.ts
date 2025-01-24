import { z } from 'zod';
import { ProjectsCreateNestedOneWithoutTechStackInputObjectSchema } from './ProjectsCreateNestedOneWithoutTechStackInput.schema';
import { TechnologyCreateNestedOneWithoutProjectsInputObjectSchema } from './TechnologyCreateNestedOneWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateInput> = z
  .object({
    addedAt: z.coerce.date().optional(),
    addedBy: z.string(),
    project: z.lazy(
      () => ProjectsCreateNestedOneWithoutTechStackInputObjectSchema,
    ),
    technology: z.lazy(
      () => TechnologyCreateNestedOneWithoutProjectsInputObjectSchema,
    ),
  })
  .strict();

export const ProjectsOnTechnologiesCreateInputObjectSchema = Schema;
