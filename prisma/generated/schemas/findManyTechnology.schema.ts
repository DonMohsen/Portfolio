import { z } from 'zod';
import { TechnologyOrderByWithRelationInputObjectSchema } from './objects/TechnologyOrderByWithRelationInput.schema';
import { TechnologyWhereInputObjectSchema } from './objects/TechnologyWhereInput.schema';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';
import { TechnologyScalarFieldEnumSchema } from './enums/TechnologyScalarFieldEnum.schema';

export const TechnologyFindManySchema = z.object({
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
  distinct: z.array(TechnologyScalarFieldEnumSchema).optional(),
});
