import { z } from 'zod';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereInput.schema';
import { ProjectsOnTechnologiesOrderByWithAggregationInputObjectSchema } from './objects/ProjectsOnTechnologiesOrderByWithAggregationInput.schema';
import { ProjectsOnTechnologiesScalarWhereWithAggregatesInputObjectSchema } from './objects/ProjectsOnTechnologiesScalarWhereWithAggregatesInput.schema';
import { ProjectsOnTechnologiesScalarFieldEnumSchema } from './enums/ProjectsOnTechnologiesScalarFieldEnum.schema';

export const ProjectsOnTechnologiesGroupBySchema = z.object({
  where: ProjectsOnTechnologiesWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ProjectsOnTechnologiesOrderByWithAggregationInputObjectSchema,
      ProjectsOnTechnologiesOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having:
    ProjectsOnTechnologiesScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ProjectsOnTechnologiesScalarFieldEnumSchema),
});
