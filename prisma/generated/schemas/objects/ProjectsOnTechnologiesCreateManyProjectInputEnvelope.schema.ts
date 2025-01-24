import { z } from 'zod';
import { ProjectsOnTechnologiesCreateManyProjectInputObjectSchema } from './ProjectsOnTechnologiesCreateManyProjectInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ProjectsOnTechnologiesCreateManyProjectInputObjectSchema),
        z
          .lazy(() => ProjectsOnTechnologiesCreateManyProjectInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ProjectsOnTechnologiesCreateManyProjectInputEnvelopeObjectSchema =
  Schema;
