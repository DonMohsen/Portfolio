import { z } from 'zod';
import { ProjectsCreateWithoutTechStackInputObjectSchema } from './ProjectsCreateWithoutTechStackInput.schema';
import { ProjectsUncheckedCreateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedCreateWithoutTechStackInput.schema';
import { ProjectsCreateOrConnectWithoutTechStackInputObjectSchema } from './ProjectsCreateOrConnectWithoutTechStackInput.schema';
import { ProjectsWhereUniqueInputObjectSchema } from './ProjectsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsCreateNestedOneWithoutTechStackInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProjectsCreateWithoutTechStackInputObjectSchema),
        z.lazy(() => ProjectsUncheckedCreateWithoutTechStackInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProjectsCreateOrConnectWithoutTechStackInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProjectsWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ProjectsCreateNestedOneWithoutTechStackInputObjectSchema = Schema;
