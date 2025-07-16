import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function getFavorites(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;

	console.log('Fetching favorites for user:', userId);

	try {
		const response = await prisma.favorites.findMany({
			where: { userId },
			orderBy: { created_at: 'desc' },
			select: {
				external_id: true,
				created_at: true,
			},
		});

		reply.status(200).send(response);
	} catch (error) {
		console.error('Error fetching favorites:', error);
		reply.status(500).send({ error: 'Failed to fetch favorites' });
	}
}
