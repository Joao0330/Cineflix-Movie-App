import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

interface SearchMovieQuery {
	query: string;
}

export async function searchMovie(request: FastifyRequest<{ Querystring: SearchMovieQuery }>, reply: FastifyReply) {
	try {
		const response = await TmdbApi.get('/search/movie', {
			params: {
				query: request.query.query,
			},
		});

		reply.status(200).send(response.data);
	} catch (error) {
		console.error('Error searching for movies', error);
		reply.status(500).send({ error: 'Failed to search movies' });
	}
}
