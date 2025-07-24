import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteListSchema } from '../../../schemas/list.schema';
import { prisma } from '../../../lib/prisma';

export async function deleteList(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;
	const { listId } = deleteListSchema.parse(request.body);

	try {
		const deletedList = await prisma.movieList.delete({
			where: {
				id: listId,
			},
		});

		if (!deletedList) {
			return reply.status(404).send({ error: 'List not found' });
		}

		reply.status(204).send();
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to delete list' });
	}
}
