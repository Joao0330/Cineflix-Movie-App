import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { addReview } from './addReview';
import { getMovieReviews } from './getMovieReviews';
import { getUserReviews } from './getUserReviews';
import { deleteReview } from './deleteReview';

export async function reviewRoutes(app: FastifyInstance) {
	app.post('/reviews', { onRequest: [verifyJwt] }, addReview);
	app.get('/reviews/:movieId', { onRequest: [verifyJwt] }, getMovieReviews);
	app.get('/reviews', { onRequest: [verifyJwt] }, getUserReviews);
	app.delete('/reviews', { onRequest: [verifyJwt] }, deleteReview);
}
