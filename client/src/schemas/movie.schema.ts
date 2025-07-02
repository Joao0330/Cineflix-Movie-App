import { z } from 'zod';

export const movieBrowseSchema = z.object({
	search: z.string().optional(),
	genres: z.array(z.string()).optional(),
	year: z
		.string()
		.optional()
		.refine(val => !val || (Number(val) >= 1900 && Number(val) <= new Date().getFullYear()), {
			message: `Year must be between 1900 and ${new Date().getFullYear()}`,
		}),
	sortBy: z.enum(['popularity', 'release_date', 'vote_average', 'original_title']),
	order: z.enum(['asc', 'desc']),
});
