import { z } from 'zod';
import { ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesCreateManyTechnologyInputEnvelopeObjectSchema } from './ProjectsOnTechnologiesCreateManyTechnologyInputEnvelope.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutTechnologyInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            ProjectsOnTechnologiesCreateManyTechnologyInputEnvelopeObjectSchema,
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

export const ProjectsOnTechnologiesUncheckedCreateNestedManyWithoutTechnologyInputObjectSchema =
  Schema;
