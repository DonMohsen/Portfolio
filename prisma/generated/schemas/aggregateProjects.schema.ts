import { z } from 'zod';
import { ProjectsOrderByWithRelationInputObjectSchema } from './objects/ProjectsOrderByWithRelationInput.schema';
import { ProjectsWhereInputObjectSchema } from './objects/ProjectsWhereInput.schema';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';
import { ProjectsCountAggregateInputObjectSchema } from './objects/ProjectsCountAggregateInput.schema';
import { ProjectsMinAggregateInputObjectSchema } from './objects/ProjectsMinAggregateInput.schema';
import { ProjectsMaxAggregateInputObjectSchema } from './objects/ProjectsMaxAggregateInput.schema';
import { ProjectsAvgAggregateInputObjectSchema } from './objects/ProjectsAvgAggregateInput.schema';
import { ProjectsSumAggregateInputObjectSchema } from './objects/ProjectsSumAggregateInput.schema';

export const ProjectsAggregateSchema = z.object({
  orderBy: z
    .union([
      ProjectsOrderByWithRelationInputObjectSchema,
      ProjectsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProjectsWhereInputObjectSchema.optional(),
  cursor: ProjectsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ProjectsCountAggregateInputObjectSchema])
    .optional(),
  _min: ProjectsMinAggregateInputObjectSchema.optional(),
  _max: ProjectsMaxAggregateInputObjectSchema.optional(),
  _avg: ProjectsAvgAggregateInputObjectSchema.optional(),
  _sum: ProjectsSumAggregateInputObjectSchema.optional(),
});
