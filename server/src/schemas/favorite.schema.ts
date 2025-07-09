import { z } from 'zod';

export const addFavoriteSchema = z.object({
	external_id: z.string().min(1, { message: 'External ID is required' }),
});
