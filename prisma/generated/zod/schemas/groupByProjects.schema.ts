import { z } from 'zod';
import { ProjectsWhereInputObjectSchema } from './objects/ProjectsWhereInput.schema';
import { ProjectsOrderByWithAggregationInputObjectSchema } from './objects/ProjectsOrderByWithAggregationInput.schema';
import { ProjectsScalarWhereWithAggregatesInputObjectSchema } from './objects/ProjectsScalarWhereWithAggregatesInput.schema';
import { ProjectsScalarFieldEnumSchema } from './enums/ProjectsScalarFieldEnum.schema';

export const ProjectsGroupBySchema = z.object({
  where: ProjectsWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ProjectsOrderByWithAggregationInputObjectSchema,
      ProjectsOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ProjectsScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ProjectsScalarFieldEnumSchema),
});
