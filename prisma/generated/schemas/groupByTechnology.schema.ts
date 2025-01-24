import { z } from 'zod';
import { TechnologyWhereInputObjectSchema } from './objects/TechnologyWhereInput.schema';
import { TechnologyOrderByWithAggregationInputObjectSchema } from './objects/TechnologyOrderByWithAggregationInput.schema';
import { TechnologyScalarWhereWithAggregatesInputObjectSchema } from './objects/TechnologyScalarWhereWithAggregatesInput.schema';
import { TechnologyScalarFieldEnumSchema } from './enums/TechnologyScalarFieldEnum.schema';

export const TechnologyGroupBySchema = z.object({
  where: TechnologyWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      TechnologyOrderByWithAggregationInputObjectSchema,
      TechnologyOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: TechnologyScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(TechnologyScalarFieldEnumSchema),
});
