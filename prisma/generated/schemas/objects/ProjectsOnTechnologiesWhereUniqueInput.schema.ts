import { z } from 'zod';
import { ProjectsOnTechnologiesProjectIdTechnologyIdCompoundUniqueInputObjectSchema } from './ProjectsOnTechnologiesProjectIdTechnologyIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesWhereUniqueInput> = z
  .object({
    projectId_technologyId: z
      .lazy(
        () =>
          ProjectsOnTechnologiesProjectIdTechnologyIdCompoundUniqueInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ProjectsOnTechnologiesWhereUniqueInputObjectSchema = Schema;
