import { z } from 'zod';

export const TechnologyScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'imageUrl',
]);
