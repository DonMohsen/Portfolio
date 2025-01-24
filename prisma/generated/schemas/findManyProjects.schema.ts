import { z } from 'zod';
import { ProjectsOrderByWithRelationInputObjectSchema } from './objects/ProjectsOrderByWithRelationInput.schema';
import { ProjectsWhereInputObjectSchema } from './objects/ProjectsWhereInput.schema';
import { ProjectsWhereUniqueInputObjectSchema } from './objects/ProjectsWhereUniqueInput.schema';
import { ProjectsScalarFieldEnumSchema } from './enums/ProjectsScalarFieldEnum.schema';

export const ProjectsFindManySchema = z.object({
  orderBy: z
    .union([
      ProjectsOrderByWithRelationInputObjectSchema,
      ProjectsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProjectsWhereInputObjectSchema.optional(),
  cursor: ProjectsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ProjectsScalarFieldEnumSchema).optional(),
});
