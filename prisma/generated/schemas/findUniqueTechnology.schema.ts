import { z } from 'zod';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';

export const TechnologyFindUniqueSchema = z.object({
  where: TechnologyWhereUniqueInputObjectSchema,
});
