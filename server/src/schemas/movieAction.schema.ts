import { z } from 'zod';

export const movieActionSchema = z.object({
	external_id: z.string().min(1, { message: 'External ID is required' }),
});
