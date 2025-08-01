import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	TMDB_ACCESS_TOKEN: z.string(),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	ADMIN_EMAIL: z.string(),
	ADMIN_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('Invalid environment variables', _env.error.format());
	throw new Error('Invalid environment variables');
}

export const env = _env.data;
