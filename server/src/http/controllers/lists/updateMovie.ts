import { FastifyReply, FastifyRequest } from 'fastify';
import { updateMovieFromListSchema } from '../../../schemas/list.schema';
import { prisma } from '../../../lib/prisma';

export async function updateMovieFromList(request: FastifyRequest, reply: FastifyReply) {
	const { listId, external_id, status } = updateMovieFromListSchema.parse(request.body);

	try {
		const updatedMovie = await prisma.movie.update({
			where: {
				movieListId_external_id: {
					movieListId: listId,
					external_id,
				},
			},
			data: {
				status,
			},
		});

		return reply.status(200).send(updatedMovie);
	} catch (error) {
		console.error('Error updating movie from list:', error);
		return reply.status(500).send({ error: 'Failed to update movie from list' });
	}
}
