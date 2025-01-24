import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesUpdateWithoutTechnologyInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInputObjectSchema =
  Schema;
