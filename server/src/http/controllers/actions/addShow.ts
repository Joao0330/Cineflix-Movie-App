import { prisma } from '../../../lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { movieActionSchema } from '../../../schemas/movieAction.schema';
import { verifyIsAlreadyAdded } from '../../../lib/favorites/verifyIsAlreadyAdded';

export async function addShow(request: FastifyRequest, reply: FastifyReply, actionType: 'favorite' | 'movieList') {
	const newFavorite = movieActionSchema.parse(request.body);

	const { id: userId } = request.user;

	let action;

	try {
		if (actionType === 'favorite') {
			if (await verifyIsAlreadyAdded(newFavorite.external_id, actionType)) {
				return reply.status(409).send({ error: 'This item is already in your favorites' });
			}

			action = await prisma.favorites.create({
				data: {
					userId,
					external_id: newFavorite.external_id,
				},
				select: {
					external_id: true,
					created_at: true,
				},
			});

			reply.status(201).send({ action });
		} else {
			if (await verifyIsAlreadyAdded(newFavorite.external_id, actionType)) {
				return reply.status(409).send({ error: 'This item is already in your movie list' });
			}

			action = await prisma.movieList.create({
				data: {
					userId,
					external_id: newFavorite.external_id,
				},
				select: {
					external_id: true,
					created_at: true,
				},
			});

			reply.status(201).send({ action });
		}
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to execute action' });
	}
}
