import { z } from 'zod';

export const addReviewSchema = z.object({
	movieId: z.number().int().positive({ message: 'External ID must be a positive integer' }),
	content: z.string().min(1, { message: 'Content is required' }),
	rating: z.number().int().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
});
