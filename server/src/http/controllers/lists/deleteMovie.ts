import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { deleteMovieFromListSchema } from '../../../schemas/list.schema';

export async function deleteMovieFromList(request: FastifyRequest, reply: FastifyReply) {
	const { listId, external_id } = deleteMovieFromListSchema.parse(request.body);
	const { id: userId } = request.user;

	try {
		await prisma.$transaction(async tx => {
			const list = await tx.movieList.findUnique({
				where: {
					id: listId,
					userId,
				},
			});

			if (!list) {
				throw new Error('List not found');
			}

			await tx.movie.delete({
				where: {
					movieListId_external_id: {
						movieListId: listId,
						external_id,
					},
				},
			});
		});

		reply.status(204).send({ message: 'Movie removed from list successfully' });
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'List not found') {
				return reply.status(404).send({ error: error.message });
			}
		}
		console.error(error);
		reply.status(500).send({ error: 'Failed to remove movie from list' });
	}
}
