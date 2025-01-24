import { z } from 'zod';
import { ProjectsWhereUniqueInputObjectSchema } from './ProjectsWhereUniqueInput.schema';
import { ProjectsCreateWithoutTechStackInputObjectSchema } from './ProjectsCreateWithoutTechStackInput.schema';
import { ProjectsUncheckedCreateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedCreateWithoutTechStackInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsCreateOrConnectWithoutTechStackInput> = z
  .object({
    where: z.lazy(() => ProjectsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProjectsCreateWithoutTechStackInputObjectSchema),
      z.lazy(() => ProjectsUncheckedCreateWithoutTechStackInputObjectSchema),
    ]),
  })
  .strict();

export const ProjectsCreateOrConnectWithoutTechStackInputObjectSchema = Schema;
