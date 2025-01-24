import { z } from 'zod';
import { ProjectsOnTechnologiesCreateManyTechnologyInputObjectSchema } from './ProjectsOnTechnologiesCreateManyTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesCreateManyTechnologyInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesCreateManyTechnologyInputObjectSchema,
        ),
        z
          .lazy(
            () => ProjectsOnTechnologiesCreateManyTechnologyInputObjectSchema,
          )
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ProjectsOnTechnologiesCreateManyTechnologyInputEnvelopeObjectSchema =
  Schema;
