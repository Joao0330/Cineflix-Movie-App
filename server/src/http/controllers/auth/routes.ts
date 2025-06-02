import { FastifyInstance } from 'fastify';
import { registerUser } from './register';
import { loginUser } from './login';
import { logoutUser } from './logout';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { getCurrentUser } from './profile';
import { googleAuth } from './googleAuth';
import { googleConfig } from './googleConfig';

export async function authRoutes(app: FastifyInstance) {
	app.post('/register', registerUser);
	app.post('/login', loginUser);
	app.post('/auth/google', googleAuth);
	app.post('/logout', logoutUser);
	app.get('/profile', { onRequest: [verifyJwt] }, getCurrentUser);
	app.get('/auth/google/config', googleConfig);
}
