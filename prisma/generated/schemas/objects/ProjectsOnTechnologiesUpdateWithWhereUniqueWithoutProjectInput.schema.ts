import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesUpdateWithoutProjectInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInputObjectSchema =
  Schema;
