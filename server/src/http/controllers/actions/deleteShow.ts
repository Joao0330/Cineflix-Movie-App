import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { movieActionSchema } from '../../../schemas/movieAction.schema';

export async function deleteShow(request: FastifyRequest, reply: FastifyReply, actionType: 'favorite' | 'movieList') {
	const { id: userId } = request.user;
	const deletedMovie = movieActionSchema.parse(request.body);

	let action;

	try {
		if (actionType === 'favorite') {
			action = await prisma.favorites.delete({
				where: {
					userId,
					external_id: deletedMovie.external_id,
				},
			});

			if (action === null) {
				return reply.status(404).send({ error: 'Favorite not found' });
			}

			reply.status(204).send({ message: 'Favorite removed successfully' });
		} else {
			action = await prisma.movieList.delete({
				where: {
					userId,
					external_id: deletedMovie.external_id,
				},
			});

			if (action === null) {
				return reply.status(404).send({ error: 'Movie list item not found' });
			}

			reply.status(204).send({ message: 'Movie list item removed successfully' });
		}
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to execute action' });
	}
}
