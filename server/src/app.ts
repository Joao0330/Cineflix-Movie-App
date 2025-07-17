import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { env } from './env';
import { ZodError } from 'zod';
import { authRoutes } from './http/controllers/auth/routes';
import fastifyCookie from '@fastify/cookie';
import { movieRoutes } from './http/controllers/movies/routes';
import { favoriteRoutes } from './http/controllers/favorites/routes';
import { listRoutes } from './http/controllers/lists/routes';

export const app = fastify();

app.register(fastifyCors, {
	origin: 'http://localhost:5173', //React app URL
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

app.register(fastifyCookie);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'accessToken',
		signed: false,
	},
});

// Register routes
app.register(authRoutes);
app.register(movieRoutes);
app.register(favoriteRoutes);
app.register(listRoutes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error', issues: error.format() });
	}

	console.error('Internal Server Error:', error.message, error.stack);
	console.log('Request Body:', request.body);
	return reply.status(500).send({ message: 'Internal server error' });
});
