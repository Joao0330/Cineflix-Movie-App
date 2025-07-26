import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { addMovieToListSchema } from '../../../schemas/list.schema';
import { verifyMovieExists } from '../../../lib/lists/verifyMovieExists';

export async function addMovieToList(request: FastifyRequest, reply: FastifyReply) {
	const { listId, external_id } = addMovieToListSchema.parse(request.body);
	const { id: userId } = request.user;

	try {
		await prisma.$transaction(async tx => {
			const list = await tx.movieList.findUnique({
				where: { id: listId, userId },
			});

			if (!list) {
				throw new Error('List not found');
			}

			const existingMovie = await tx.movie.findFirst({
				where: { movieListId: listId, external_id },
			});

			if (existingMovie) {
				throw new Error('Movie already in list');
			}

			await tx.movieList.update({
				where: { id: listId },
				data: {
					movies: {
						create: { external_id },
					},
				},
			});
		});

		return reply.status(200).send({ message: 'Movie added to list successfully' });
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'List not found') {
				return reply.status(404).send({ error: error.message });
			}
			if (error.message === 'Movie already in list') {
				return reply.status(409).send({ error: error.message });
			}
		}

		console.error(error);
		return reply.status(500).send({ error: 'Failed to add movie to list' });
	}
}
