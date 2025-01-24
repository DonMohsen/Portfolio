import { z } from 'zod';
import { ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema } from './objects/ProjectsOnTechnologiesOrderByWithRelationInput.schema';
import { ProjectsOnTechnologiesWhereInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereInput.schema';
import { ProjectsOnTechnologiesWhereUniqueInputObjectSchema } from './objects/ProjectsOnTechnologiesWhereUniqueInput.schema';
import { ProjectsOnTechnologiesScalarFieldEnumSchema } from './enums/ProjectsOnTechnologiesScalarFieldEnum.schema';

export const ProjectsOnTechnologiesFindFirstSchema = z.object({
  orderBy: z
    .union([
      ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema,
      ProjectsOnTechnologiesOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProjectsOnTechnologiesWhereInputObjectSchema.optional(),
  cursor: ProjectsOnTechnologiesWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ProjectsOnTechnologiesScalarFieldEnumSchema).optional(),
});
