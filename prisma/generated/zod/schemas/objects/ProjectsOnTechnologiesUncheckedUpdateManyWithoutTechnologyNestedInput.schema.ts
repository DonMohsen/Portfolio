import { z } from 'zod';
import { ProjectsOnTechnologiesCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateOrConnectWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesCreateManyTechnologyInputEnvelopeObjectSchema } from './ProjectsOnTechnologiesCreateManyTechnologyInputEnvelope.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesScalarWhereInputObjectSchema } from './ProjectsOnTechnologiesScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechnologyNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutTechnologyInputObjectSchema,
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
      set: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema),
          z
            .lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechnologyNestedInputObjectSchema =
  Schema;
