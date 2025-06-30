import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

interface SearchMoviesBrowseQuery {
	search?: string;
	genre?: string;
	year?: string;
	sortBy?: 'title' | 'year' | 'rating';
	order?: 'asc' | 'desc';
}

export async function searchMoviesBrowse(request: FastifyRequest<{ Querystring: SearchMoviesBrowseQuery }>, reply: FastifyReply) {
	try {
		const response = await TmdbApi.get('/search/movie', {
			params: {
				query: request.query.search,
				with_genres: request.query.genre,
				year: request.query.year,
				sort_by: request.query.sortBy,
				sort_order: request.query.order,
			},
		});

		reply.status(200).send(response.data);
	} catch (error) {
		console.error('Error searching for the desired movies', error);
		reply.status(500).send({ error: 'Failed to search movies' });
	}
}
