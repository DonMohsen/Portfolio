import { z } from 'zod';
import { ProjectsOnTechnologiesScalarWhereInputObjectSchema } from './ProjectsOnTechnologiesScalarWhereInput.schema';
import { ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema } from './ProjectsOnTechnologiesUpdateManyMutationInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateManyWithoutProjectsInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateManyWithoutProjectsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateManyWithoutProjectsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateManyWithWhereWithoutTechnologyInputObjectSchema =
  Schema;
