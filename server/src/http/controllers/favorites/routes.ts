import { FastifyInstance } from 'fastify';
import { addFavorite } from './addFavorite';
import { getFavorites } from './getFavorites';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { deleteFavorite } from './deleteFavorite';

export async function favoriteRoutes(app: FastifyInstance) {
	app.post('/favorites', { onRequest: [verifyJwt] }, addFavorite);
	app.get('/favorites', { onRequest: [verifyJwt] }, getFavorites);
	app.delete('/favorites', { onRequest: [verifyJwt] }, deleteFavorite);
}
