import { z } from 'zod';

export const movieBrowseSchema = z.object({
	search: z.string().optional(),
	genre: z.string().optional(),
	year: z.string().optional(),
	sortBy: z.enum(['title', 'year', 'rating']).optional(),
	order: z.enum(['asc', 'desc']).optional(),
});
