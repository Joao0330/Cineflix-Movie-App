import { FastifyReply, FastifyRequest } from 'fastify';
import { TmdbApi } from '../../../lib/axios';

interface MovieParams {
	movieId: string;
}

export async function getMovieDetails(request: FastifyRequest<{ Params: MovieParams }>, reply: FastifyReply) {
	try {
		const movieId = request.params.movieId;
		const response = await TmdbApi.get(`/movie/${movieId}`, {
			params: {
				append_to_response: 'videos,credits,images,genres,similar',
			},
		});

		reply.status(200).send(response.data);
	} catch (err) {
		console.error('Error fetching movie details:', err);
		reply.status(500).send({ error: 'Failed to fetch movie details' });
	}
}
