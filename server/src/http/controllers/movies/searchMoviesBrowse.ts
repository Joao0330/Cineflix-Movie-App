import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

interface SearchMoviesBrowseQuery {
	search?: string;
	genre?: string;
	year?: string;
	sortBy?: 'popularity' | 'release_date' | 'vote_average' | 'original_title';
	order?: 'asc' | 'desc';
}

export async function searchMoviesBrowse(request: FastifyRequest<{ Querystring: SearchMoviesBrowseQuery }>, reply: FastifyReply) {
	try {
		const { search, genre, year, sortBy, order } = request.query;

		const validSortBy =
			{
				popularity: 'popularity',
				release_date: 'release_date',
				vote_average: 'vote_average',
				original_title: 'original_title',
			}[sortBy || 'popularity'] || 'popularity';
		const sortOrder = order === 'asc' ? 'asc' : 'desc';
		const sortByParam = `${validSortBy}.${sortOrder}`;

		const endpoint = search ? '/search/movie' : '/discover/movie';
		const params: Record<string, string> = {};

		if (search) {
			params.query = search;
		} else {
			if (genre) params.with_genres = genre;
			if (year) params.primary_release_year = year;
			params.sort_by = sortByParam;
		}

		const response = await TmdbApi.get(endpoint, { params });

		reply.status(200).send(response.data);
	} catch (error) {
		console.error('Error searching for the desired movies', error);
		reply.status(500).send({ error: 'Failed to search movies' });
	}
}
