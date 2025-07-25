import { z } from 'zod';

export const addListSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
});

export const addMovieToListSchema = z.object({
	listId: z.number().int().positive({ message: 'List ID must be a positive integer' }),
	external_id: z.number().int().positive({ message: 'External ID must be a positive integer' }),
});

export const deleteListSchema = z.object({
	listId: z.number().int().positive('List ID must be a positive integer'),
});

export const deleteMovieFromListSchema = addMovieToListSchema;

export const updateMovieFromListSchema = addMovieToListSchema.extend({
	status: z.enum(['WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLANNING'], { message: 'Invalid status' }),
});
