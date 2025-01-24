import { z } from 'zod';
import { TechnologyCreateWithoutProjectsInputObjectSchema } from './TechnologyCreateWithoutProjectsInput.schema';
import { TechnologyUncheckedCreateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedCreateWithoutProjectsInput.schema';
import { TechnologyCreateOrConnectWithoutProjectsInputObjectSchema } from './TechnologyCreateOrConnectWithoutProjectsInput.schema';
import { TechnologyWhereUniqueInputObjectSchema } from './TechnologyWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyCreateNestedOneWithoutProjectsInput> =
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
      connect: z.lazy(() => TechnologyWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const TechnologyCreateNestedOneWithoutProjectsInputObjectSchema = Schema;
