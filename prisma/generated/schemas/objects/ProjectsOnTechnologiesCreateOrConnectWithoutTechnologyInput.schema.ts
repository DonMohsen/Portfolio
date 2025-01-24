import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
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

export const ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInputObjectSchema =
  Schema;
