import { z } from 'zod';
import { TechnologyUpdateInputObjectSchema } from './objects/TechnologyUpdateInput.schema';
import { TechnologyUncheckedUpdateInputObjectSchema } from './objects/TechnologyUncheckedUpdateInput.schema';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';

export const TechnologyUpdateOneSchema = z.object({
  data: z.union([
    TechnologyUpdateInputObjectSchema,
    TechnologyUncheckedUpdateInputObjectSchema,
  ]),
  where: TechnologyWhereUniqueInputObjectSchema,
});
