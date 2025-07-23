import { z } from 'zod';

export const addFavoriteSchema = z.object({
	external_id: z.number().min(1, { message: 'External ID is required' }),
});
