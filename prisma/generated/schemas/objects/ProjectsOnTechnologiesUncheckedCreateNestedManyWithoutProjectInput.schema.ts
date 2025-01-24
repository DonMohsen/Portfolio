import { z } from 'zod';
import { ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesCreateOrConnectWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateOrConnectWithoutProjectInput.schema';
import { ProjectsOnTechnologiesCreateManyProjectInputEnvelopeObjectSchema } from './ProjectsOnTechnologiesCreateManyProjectInputEnvelope.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () => ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesCreateOrConnectWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesCreateOrConnectWithoutProjectInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            ProjectsOnTechnologiesCreateManyProjectInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutProjectInputObjectSchema =
  Schema;
