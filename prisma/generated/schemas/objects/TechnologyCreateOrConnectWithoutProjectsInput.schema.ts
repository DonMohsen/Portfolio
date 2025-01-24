import { z } from 'zod';
import { TechnologyWhereUniqueInputObjectSchema } from './TechnologyWhereUniqueInput.schema';
import { TechnologyCreateWithoutProjectsInputObjectSchema } from './TechnologyCreateWithoutProjectsInput.schema';
import { TechnologyUncheckedCreateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedCreateWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyCreateOrConnectWithoutProjectsInput> =
  z
    .object({
      where: z.lazy(() => TechnologyWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => TechnologyCreateWithoutProjectsInputObjectSchema),
        z.lazy(() => TechnologyUncheckedCreateWithoutProjectsInputObjectSchema),
      ]),
    })
    .strict();

export const TechnologyCreateOrConnectWithoutProjectsInputObjectSchema = Schema;
