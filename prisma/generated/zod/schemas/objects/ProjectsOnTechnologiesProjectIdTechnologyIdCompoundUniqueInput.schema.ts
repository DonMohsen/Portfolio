import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesProjectIdTechnologyIdCompoundUniqueInput> =
  z
    .object({
      projectId: z.number(),
      technologyId: z.number(),
    })
    .strict();

export const ProjectsOnTechnologiesProjectIdTechnologyIdCompoundUniqueInputObjectSchema =
  Schema;
