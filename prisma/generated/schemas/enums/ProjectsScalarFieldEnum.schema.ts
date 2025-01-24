import { z } from 'zod';

export const ProjectsScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'lastUpdatedAt',
  'name',
  'description',
  'liveLink',
  'image',
  'competency',
  'projectType',
  'githubLink',
]);
