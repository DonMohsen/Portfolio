import { z } from 'zod';
import { TechnologyWhereInputObjectSchema } from './objects/TechnologyWhereInput.schema';

export const TechnologyDeleteManySchema = z.object({
  where: TechnologyWhereInputObjectSchema.optional(),
});
