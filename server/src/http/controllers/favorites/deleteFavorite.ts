import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function deleteFavorite(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;
	const { external_id } = request.body as { external_id: string };

	try {
		const deletedFavorite = await prisma.favorites.delete({
			where: {
				userId_external_id: {
					userId,
					external_id,
				},
			},
		});

		if (deletedFavorite === null) {
			return reply.status(404).send({ error: 'Favorite not found' });
		}

		reply.status(204).send({ message: 'Favorite removed successfully' });
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to remove favorite' });
	}
}
