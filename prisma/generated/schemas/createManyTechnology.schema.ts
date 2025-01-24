import { z } from 'zod';
import { TechnologyCreateManyInputObjectSchema } from './objects/TechnologyCreateManyInput.schema';

export const TechnologyCreateManySchema = z.object({
  data: z.union([
    TechnologyCreateManyInputObjectSchema,
    z.array(TechnologyCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
