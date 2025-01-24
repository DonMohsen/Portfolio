import { z } from 'zod';
import { ProjectTypesSchema } from '../enums/ProjectTypes.schema';
import { ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutProjectInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    lastUpdatedAt: z.coerce.date().optional(),
    name: z.string(),
    description: z.string(),
    liveLink: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    competency: z.number(),
    projectType: z.lazy(() => ProjectTypesSchema),
    githubLink: z.string(),
    techStack: z
      .lazy(
        () =>
          ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutProjectInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ProjectsUncheckedCreateInputObjectSchema = Schema;
