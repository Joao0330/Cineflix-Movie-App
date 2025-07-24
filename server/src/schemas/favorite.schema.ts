import { z } from 'zod';

export const addFavoriteSchema = z.object({
	external_id: z.number().int().positive({ message: 'External ID must be a positive integer' }),
});
