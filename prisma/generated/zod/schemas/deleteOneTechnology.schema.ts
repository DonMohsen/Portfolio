import { z } from 'zod';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';

export const TechnologyDeleteOneSchema = z.object({
  where: TechnologyWhereUniqueInputObjectSchema,
});
