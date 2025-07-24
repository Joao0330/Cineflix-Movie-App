import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { addList } from './addList';
import { addMovieToList } from './addMovie';
import { getLists } from './getLists';
import { deleteList } from './deleteList';

export async function listRoutes(app: FastifyInstance) {
	app.post('/lists', { onRequest: [verifyJwt] }, addList);
	app.post('/lists/movies', { onRequest: [verifyJwt] }, addMovieToList);
	app.get('/lists', { onRequest: [verifyJwt] }, getLists);
	app.delete('/lists', { onRequest: [verifyJwt] }, deleteList);
}
