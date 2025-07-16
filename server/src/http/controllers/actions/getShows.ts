import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function getShows(request: FastifyRequest, reply: FastifyReply, actionType: 'favorite' | 'movieList') {
	const { id: userId } = request.user;

	let action;

	try {
		if (actionType === 'favorite') {
			action = await prisma.favorites.findMany({
				where: { userId },
				orderBy: { created_at: 'desc' },
				select: {
					external_id: true,
					created_at: true,
				},
			});

			reply.status(200).send(action);
		} else {
			action = await prisma.movieList.findMany({
				where: { userId },
				orderBy: { created_at: 'desc' },
				select: {
					external_id: true,
					created_at: true,
				},
			});

			reply.status(200).send(action);
		}
	} catch (error) {
		console.error('Error fetching details:', error);
		reply.status(500).send({ error: 'Failed to execute action' });
	}
}
