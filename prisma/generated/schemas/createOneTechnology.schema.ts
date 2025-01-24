import { z } from 'zod';
import { TechnologyCreateInputObjectSchema } from './objects/TechnologyCreateInput.schema';
import { TechnologyUncheckedCreateInputObjectSchema } from './objects/TechnologyUncheckedCreateInput.schema';

export const TechnologyCreateOneSchema = z.object({
  data: z.union([
    TechnologyCreateInputObjectSchema,
    TechnologyUncheckedCreateInputObjectSchema,
  ]),
});
