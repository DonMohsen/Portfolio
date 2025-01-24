import { z } from 'zod';
import { TechnologyUpdateManyMutationInputObjectSchema } from './objects/TechnologyUpdateManyMutationInput.schema';
import { TechnologyWhereInputObjectSchema } from './objects/TechnologyWhereInput.schema';

export const TechnologyUpdateManySchema = z.object({
  data: TechnologyUpdateManyMutationInputObjectSchema,
  where: TechnologyWhereInputObjectSchema.optional(),
});
