import { z } from 'zod';
import { TechnologyCreateWithoutProjectsInputObjectSchema } from './TechnologyCreateWithoutProjectsInput.schema';
import { TechnologyUncheckedCreateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedCreateWithoutProjectsInput.schema';
import { TechnologyCreateOrConnectWithoutProjectsInputObjectSchema } from './TechnologyCreateOrConnectWithoutProjectsInput.schema';
import { TechnologyUpsertWithoutProjectsInputObjectSchema } from './TechnologyUpsertWithoutProjectsInput.schema';
import { TechnologyWhereUniqueInputObjectSchema } from './TechnologyWhereUniqueInput.schema';
import { TechnologyUpdateWithoutProjectsInputObjectSchema } from './TechnologyUpdateWithoutProjectsInput.schema';
import { TechnologyUncheckedUpdateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedUpdateWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyUpdateOneRequiredWithoutProjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechnologyCreateWithoutProjectsInputObjectSchema),
          z.lazy(
            () => TechnologyUncheckedCreateWithoutProjectsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TechnologyCreateOrConnectWithoutProjectsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => TechnologyUpsertWithoutProjectsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => TechnologyWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => TechnologyUpdateWithoutProjectsInputObjectSchema),
          z.lazy(
            () => TechnologyUncheckedUpdateWithoutProjectsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const TechnologyUpdateOneRequiredWithoutProjectsNestedInputObjectSchema =
  Schema;
