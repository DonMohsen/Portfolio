import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectsOrderByWithRelationInputObjectSchema } from './ProjectsOrderByWithRelationInput.schema';
import { TechnologyOrderByWithRelationInputObjectSchema } from './TechnologyOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProjectsOnTechnologiesOrderByWithRelationInput> =
  z
    .object({
      projectId: z.lazy(() => SortOrderSchema).optional(),
      technologyId: z.lazy(() => SortOrderSchema).optional(),
      addedAt: z.lazy(() => SortOrderSchema).optional(),
      addedBy: z.lazy(() => SortOrderSchema).optional(),
      project: z
        .lazy(() => ProjectsOrderByWithRelationInputObjectSchema)
        .optional(),
      technology: z
        .lazy(() => TechnologyOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();

export const ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema =
  Schema;
