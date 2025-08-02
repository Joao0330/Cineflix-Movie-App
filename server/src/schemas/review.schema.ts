import { z } from 'zod';

export const addReviewSchema = z.object({
	movieId: z.number().int().positive({ message: 'External ID must be a positive integer' }),
	content: z.string().min(1, { message: 'Content is required' }),
	rating: z.number().int().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
});

export const getMovieReviewsSchema = z.object({
	movieId: z.string().transform(Number),
});

export const deleteReviewSchema = z.object({
	reviewId: z.number().int().positive({ message: 'Review ID must be a positive integer' }),
});

export const updateReviewParamsSchema = z.object({
	reviewId: z
		.string()
		.transform(Number)
		.refine(val => Number.isInteger(val) && val > 0, {
			message: 'Review ID must be a positive integer',
		}),
});

export const updateReviewBodySchema = z.object({
	rating: z.number().int().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
	content: z.string().min(1, { message: 'Comment is required' }),
});

export const getReviewsByUserIdSchema = z.object({
	userId: z
		.string()
		.transform(Number)
		.refine(val => Number.isInteger(val) && val > 0, {
			message: 'Review ID must be a positive integer',
		}),
});
