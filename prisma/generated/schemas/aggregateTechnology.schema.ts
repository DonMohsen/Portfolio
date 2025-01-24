import { z } from 'zod';
import { TechnologyOrderByWithRelationInputObjectSchema } from './objects/TechnologyOrderByWithRelationInput.schema';
import { TechnologyWhereInputObjectSchema } from './objects/TechnologyWhereInput.schema';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';
import { TechnologyCountAggregateInputObjectSchema } from './objects/TechnologyCountAggregateInput.schema';
import { TechnologyMinAggregateInputObjectSchema } from './objects/TechnologyMinAggregateInput.schema';
import { TechnologyMaxAggregateInputObjectSchema } from './objects/TechnologyMaxAggregateInput.schema';
import { TechnologyAvgAggregateInputObjectSchema } from './objects/TechnologyAvgAggregateInput.schema';
import { TechnologySumAggregateInputObjectSchema } from './objects/TechnologySumAggregateInput.schema';

export const TechnologyAggregateSchema = z.object({
  orderBy: z
    .union([
      TechnologyOrderByWithRelationInputObjectSchema,
      TechnologyOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TechnologyWhereInputObjectSchema.optional(),
  cursor: TechnologyWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), TechnologyCountAggregateInputObjectSchema])
    .optional(),
  _min: TechnologyMinAggregateInputObjectSchema.optional(),
  _max: TechnologyMaxAggregateInputObjectSchema.optional(),
  _avg: TechnologyAvgAggregateInputObjectSchema.optional(),
  _sum: TechnologySumAggregateInputObjectSchema.optional(),
});
