import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = loginSchema
	.extend({
		username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
		confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const updateUsernameSchema = z
	.object({
		username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
	})
	.refine(data => data.username.length <= 20, {
		message: 'Username must be at most 20 characters',
	});

export const changeUserRoleSchema = z.object({
	newRole: z.enum(['USER', 'MODERATOR', 'ADMIN'], { message: 'Invalid role' }),
});

export const changeUserRoleParamsSchema = z.object({
	userId: z
		.string()
		.transform(Number)
		.refine(val => Number.isInteger(val) && val > 0, {
			message: 'UserID must be a positive integer',
		}),
});

export const banUserSchema = z.object({
	is_banned: z.boolean(),
});
