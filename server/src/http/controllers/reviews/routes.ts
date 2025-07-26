import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { addReview } from './addReview';

export async function reviewRoutes(app: FastifyInstance) {
	app.post('/reviews', { onRequest: [verifyJwt] }, addReview);
}
