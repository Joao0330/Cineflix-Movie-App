import { z } from 'zod';

export const movieBrowseSchema = z.object({
	search: z.string().optional(),
	genre: z.string().optional(),
	year: z.string().optional(),
	sortBy: z.enum(['popularity', 'release_date', 'vote_average', 'original_title']),
	order: z.enum(['asc', 'desc']),
});
