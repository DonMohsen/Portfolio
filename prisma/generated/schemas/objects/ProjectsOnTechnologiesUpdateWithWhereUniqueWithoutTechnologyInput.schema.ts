import { z } from 'zod';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesUpdateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUpdateWithoutTechnologyInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(
          () => ProjectsOnTechnologiesUpdateWithoutTechnologyInputObjectSchema,
        ),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateWithoutTechnologyInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateWithWhereUniqueWithoutTechnologyInputObjectSchema =
  Schema;
