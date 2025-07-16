import { FastifyInstance } from 'fastify';
import { addShow } from './addShow';
import { getShows } from './getShows';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { deleteShow } from './deleteShow';

export async function favoriteRoutes(app: FastifyInstance) {
	app.post('/favorites', { onRequest: [verifyJwt] }, (request, reply) => addShow(request, reply, 'favorite'));
	app.get('/favorites', { onRequest: [verifyJwt] }, (request, reply) => getShows(request, reply, 'favorite'));
	app.delete('/favorites', { onRequest: [verifyJwt] }, (request, reply) => deleteShow(request, reply, 'favorite'));
}
