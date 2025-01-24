import { z } from 'zod';
import { ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema } from './objects/ProjectsOnTechnologiesOrderByWithRelationInput.schema';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereInput.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesCountAggregateInputObjectSchema } from './objects/ProjectsOnTechnologiesCountAggregateInput.schema';
import { ProjectsOnTechnologiesMinAggregateInputObjectSchema } from './objects/ProjectsOnTechnologiesMinAggregateInput.schema';
import { ProjectsOnTechnologiesMaxAggregateInputObjectSchema } from './objects/ProjectsOnTechnologiesMaxAggregateInput.schema';
import { ProjectsOnTechnologiesAvgAggregateInputObjectSchema } from './objects/ProjectsOnTechnologiesAvgAggregateInput.schema';
import { ProjectsOnTechnologiesSumAggregateInputObjectSchema } from './objects/ProjectsOnTechnologiesSumAggregateInput.schema';

export const ProjectsOnTechnologiesAggregateSchema = z.object({
  orderBy: z
    .union([
      ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema,
      ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProjectsOnTechnologiesWhereInputObjectSchema.optional(),
  cursor: ProjectsOnTechnologiesWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([
      z.literal(true),
      ProjectsOnTechnologiesCountAggregateInputObjectSchema,
    ])
    .optional(),
  _min: ProjectsOnTechnologiesMinAggregateInputObjectSchema.optional(),
  _max: ProjectsOnTechnologiesMaxAggregateInputObjectSchema.optional(),
  _avg: ProjectsOnTechnologiesAvgAggregateInputObjectSchema.optional(),
  _sum: ProjectsOnTechnologiesSumAggregateInputObjectSchema.optional(),
});
