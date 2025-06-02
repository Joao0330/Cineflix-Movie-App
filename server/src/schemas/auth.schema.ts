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
