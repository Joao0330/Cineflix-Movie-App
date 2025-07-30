import { z } from 'zod';

export const reviewSchema = z.object({
	id: z.number().int().optional(),
	content: z.string().min(1, { message: 'Content is required' }),
	rating: z.number().int().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
});
