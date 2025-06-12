import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

export async function getPopularMovies(request: FastifyRequest, reply: FastifyReply) {
	try {
		const response = await TmdbApi.get('/movie/popular');

		const movies = response.data.results
			.sort((a: any, b: any) => {
				return b.popularity - a.popularity;
			})
			.slice(0, 10);

		reply.status(200).send(movies);
	} catch (err) {
		reply.status(500).send({ error: 'Failed to fetch movies' });
	}
}
