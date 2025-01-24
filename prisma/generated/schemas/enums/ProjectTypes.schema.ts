import { z } from 'zod';

export const ProjectTypesSchema = z.enum([
  'Practice',
  'Copy',
  'Forked',
  'Real',
]);
