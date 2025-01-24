import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutProjectInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesUpdateWithoutProjectInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateWithoutProjectInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInputObjectSchema =
  Schema;
