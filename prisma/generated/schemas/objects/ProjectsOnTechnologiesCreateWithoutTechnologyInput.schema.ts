import { z } from 'zod';
import { ProjectsCreateNestedOneWithoutTechStackInputObjectSchema } from './ProjectsCreateNestedOneWithoutTechStackInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateWithoutTechnologyInput> =
  z
    .object({
      addedAt: z.coerce.date().optional(),
      addedBy: z.string(),
      project: z.lazy(
        () => ProjectsCreateNestedOneWithoutTechStackInputObjectSchema,
      ),
    })
    .strict();

export const ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema =
  Schema;
