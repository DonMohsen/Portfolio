import { z } from 'zod';
import { TechnologyUpdateWithoutProjectsInputObjectSchema } from './TechnologyUpdateWithoutProjectsInput.schema';
import { TechnologyUncheckedUpdateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedUpdateWithoutProjectsInput.schema';
import { TechnologyCreateWithoutProjectsInputObjectSchema } from './TechnologyCreateWithoutProjectsInput.schema';
import { TechnologyUncheckedCreateWithoutProjectsInputObjectSchema } from './TechnologyUncheckedCreateWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TechnologyUpsertWithoutProjectsInput> = z
  .object({
    update: z.union([
      z.lazy(() => TechnologyUpdateWithoutProjectsInputObjectSchema),
      z.lazy(() => TechnologyUncheckedUpdateWithoutProjectsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TechnologyCreateWithoutProjectsInputObjectSchema),
      z.lazy(() => TechnologyUncheckedCreateWithoutProjectsInputObjectSchema),
    ]),
  })
  .strict();

export const TechnologyUpsertWithoutProjectsInputObjectSchema = Schema;
