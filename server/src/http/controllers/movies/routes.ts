import { FastifyInstance } from 'fastify';
import { getPopularMovies } from './getPopularMovies';
import { getMovieGenres } from './getMovieGenres';
import { getMovieDetails } from './getMovieDetails';

export async function movieRoutes(app: FastifyInstance) {
	app.get('/movies-popular', getPopularMovies);
	app.get('/movies-genres', getMovieGenres);
	app.get('/movies/:movieId', getMovieDetails);
}
