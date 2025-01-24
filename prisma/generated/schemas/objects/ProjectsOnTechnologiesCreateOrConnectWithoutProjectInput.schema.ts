import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutProjectInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
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

export const ProjectsOnTechnologiesCreateOrConnectWithoutProjectInputObjectSchema =
  Schema;
