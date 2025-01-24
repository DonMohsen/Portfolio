import { z } from 'zod';
import { TechnologyWhereUniqueInputObjectSchema } from './objects/TechnologyWhereUniqueInput.schema';
import { TechnologyCreateInputObjectSchema } from './objects/TechnologyCreateInput.schema';
import { TechnologyUncheckedCreateInputObjectSchema } from './objects/TechnologyUncheckedCreateInput.schema';
import { TechnologyUpdateInputObjectSchema } from './objects/TechnologyUpdateInput.schema';
import { TechnologyUncheckedUpdateInputObjectSchema } from './objects/TechnologyUncheckedUpdateInput.schema';

export const TechnologyUpsertSchema = z.object({
  where: TechnologyWhereUniqueInputObjectSchema,
  create: z.union([
    TechnologyCreateInputObjectSchema,
    TechnologyUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    TechnologyUpdateInputObjectSchema,
    TechnologyUncheckedUpdateInputObjectSchema,
  ]),
});
