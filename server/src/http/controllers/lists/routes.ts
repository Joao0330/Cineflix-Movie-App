import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { addList } from './addList';
import { addMovieToList } from './addMovie';

export async function listRoutes(app: FastifyInstance) {
	app.post('/lists', { onRequest: [verifyJwt] }, addList);
	app.post('/lists/movies', { onRequest: [verifyJwt] }, addMovieToList);
}
