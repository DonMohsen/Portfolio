import { z } from 'zod';
import { ProjectsOnTechnologiesCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUncheckedCreateWithoutProjectInput.schema';
import { ProjectsOnTechnologiesCreateOrConnectWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateOrConnectWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInput.schema';
import { ProjectsOnTechnologiesCreateManyProjectInputEnvelopeObjectSchema } from './ProjectsOnTechnologiesCreateManyProjectInputEnvelope.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInput.schema';
import { ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInputObjectSchema } from './ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInput.schema';
import { ProjectsOnTechnologiesScalarWhereInputObjectSchema } from './ProjectsOnTechnologiesScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateManyWithoutProjectNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpsertWithWhereUniqueWithoutProjectInputObjectSchema,
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
              ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutProjectInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInputObjectSchema,
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

export const ProjectsOnTechnologiesUpdateManyWithoutProjectNestedInputObjectSchema =
  Schema;
