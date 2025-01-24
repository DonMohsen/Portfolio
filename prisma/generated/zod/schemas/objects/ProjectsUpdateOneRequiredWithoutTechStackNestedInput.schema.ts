import { z } from 'zod';
import { ProjectsCreateWithoutTechStackInputObjectSchema } from './ProjectsCreateWithoutTechStackInput.schema';
import { ProjectsUncheckedCreateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedCreateWithoutTechStackInput.schema';
import { ProjectsCreateOrConnectWithoutTechStackInputObjectSchema } from './ProjectsCreateOrConnectWithoutTechStackInput.schema';
import { ProjectsUpsertWithoutTechStackInputObjectSchema } from './ProjectsUpsertWithoutTechStackInput.schema';
import { ProjectsWhereUniqueInputObjectSchema } from './ProjectsWhereUniqueInput.schema';
import { ProjectsUpdateWithoutTechStackInputObjectSchema } from './ProjectsUpdateWithoutTechStackInput.schema';
import { ProjectsUncheckedUpdateWithoutTechStackInputObjectSchema } from './ProjectsUncheckedUpdateWithoutTechStackInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsUpdateOneRequiredWithoutTechStackNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectsCreateWithoutTechStackInputObjectSchema),
          z.lazy(
            () => ProjectsUncheckedCreateWithoutTechStackInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectsCreateOrConnectWithoutTechStackInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProjectsUpsertWithoutTechStackInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProjectsWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectsUpdateWithoutTechStackInputObjectSchema),
          z.lazy(
            () => ProjectsUncheckedUpdateWithoutTechStackInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const ProjectsUpdateOneRequiredWithoutTechStackNestedInputObjectSchema =
  Schema;
