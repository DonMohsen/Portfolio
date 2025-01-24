import { z } from 'zod';
import { ProjectsOnTechnologiesScalarWhereInputObjectSchema } from './ProjectsOnTechnologiesScalarWhereInput.schema';
import { ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema } from './ProjectsOnTechnologiesUpdateManyMutationInput.schema';
import { ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechStackInputObjectSchema } from './ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechStackInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ProjectsOnTechnologiesScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ProjectsOnTechnologiesUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ProjectsOnTechnologiesUncheckedUpdateManyWithoutTechStackInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProjectsOnTechnologiesUpdateManyWithWhereWithoutProjectInputObjectSchema =
  Schema;
