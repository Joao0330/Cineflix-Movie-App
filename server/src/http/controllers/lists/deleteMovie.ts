import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { deleteMovieFromListSchema } from '../../../schemas/list.schema';

export async function deleteMovieFromList(request: FastifyRequest, reply: FastifyReply) {
	const { listId, external_id } = deleteMovieFromListSchema.parse(request.body);
	const { id: userId } = request.user;

	try {
		const list = await prisma.movieList.findUnique({
			where: {
				id: listId,
				userId,
			},
		});

		if (!list) {
			return reply.status(404).send({ error: 'List not found' });
		}

		await prisma.movie.delete({
			where: {
				movieListId_external_id: {
					movieListId: listId,
					external_id,
				},
			},
		});

		reply.status(204).send({ message: 'Movie removed from list successfully' });
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to remove movie from list' });
	}
}
