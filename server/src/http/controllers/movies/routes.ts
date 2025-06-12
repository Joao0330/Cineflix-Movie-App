import { FastifyInstance } from 'fastify';
import { getPopularMovies } from './getPopularMovies';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { getMovieGenres } from './getMovieGenres';

export async function movieRoutes(app: FastifyInstance) {
	app.get('/movies-popular', getPopularMovies);
	app.get('/movies-genres', getMovieGenres);
}
