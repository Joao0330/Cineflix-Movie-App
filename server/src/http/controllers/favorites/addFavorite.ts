import { prisma } from '../../../lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { addFavoriteSchema } from '../../../schemas/favorite.schema';
import { verifyIsAlreadyFavorite } from '../../../lib/favorites/verifyIsAlreadyFavorite';

export async function addFavorite(request: FastifyRequest, reply: FastifyReply) {
	const newFavorite = addFavoriteSchema.parse(request.body);

	const { id: userId } = request.user;

	try {
		if (await verifyIsAlreadyFavorite(newFavorite.external_id, userId)) {
			return reply.status(409).send({ error: 'This item is already in your favorites' });
		}

		const favorite = await prisma.favorites.create({
			data: {
				userId,
				external_id: newFavorite.external_id,
			},
			select: {
				external_id: true,
				created_at: true,
			},
		});

		reply.status(201).send({ favorite });
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to add favorite' });
	}
}
