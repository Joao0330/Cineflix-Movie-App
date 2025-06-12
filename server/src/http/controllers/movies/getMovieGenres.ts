import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

export async function getMovieGenres(request: FastifyRequest, reply: FastifyReply) {
	try {
		const response = await TmdbApi.get('/genre/movie/list');

		reply.status(200).send(response.data);
	} catch (err) {
		reply.status(500).send({ error: 'Failed to fetch genres' });
	}
}
