import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { addMovieToListSchema } from '../../../schemas/list.schema';
import { verifyMovieExists } from '../../../lib/lists/verifyMovieExists';

export async function addMovieToList(request: FastifyRequest, reply: FastifyReply) {
	const { listId, external_id } = addMovieToListSchema.parse(request.body);
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

		if (await verifyMovieExists(listId, external_id)) {
			return reply.status(409).send({ error: 'This movie is already in the list' });
		}

		await prisma.movieList.update({
			where: { id: listId },
			data: {
				movies: {
					create: {
						external_id,
					},
				},
			},
		});

		reply.status(200).send({ message: 'Movie added to list successfully' });
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to add movie to list' });
	}
}
