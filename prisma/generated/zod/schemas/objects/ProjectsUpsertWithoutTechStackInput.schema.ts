import { z } from 'zod';
import { ProjectsUpdateWithoutTechStackInputObjectSchema } from './ProjectsUpdateWithoutTechStackInput.schema';
import { ProjectsUncheckedUpdateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedUpdateWithoutTechStackInput.schema';
import { ProjectsCreateWithoutTechStackInputObjectSchema } from './ProjectsCreateWithoutTechStackInput.schema';
import { ProjectsUncheckedCreateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedCreateWithoutTechStackInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsUpsertWithoutTechStackInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProjectsUpdateWithoutTechStackInputObjectSchema),
      z.lazy(() => ProjectsUncheckedUpdateWithoutTechStackInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProjectsCreateWithoutTechStackInputObjectSchema),
      z.lazy(() => ProjectsUncheckedCreateWithoutTechStackInputObjectSchema),
    ]),
  })
  .strict();

export const ProjectsUpsertWithoutTechStackInputObjectSchema = Schema;
