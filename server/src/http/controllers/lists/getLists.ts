import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function getLists(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;

	try {
		const lists = await prisma.movieList.findMany({
			where: { userId },
			orderBy: { created_at: 'desc' },
			select: {
				id: true,
				title: true,
				created_at: true,
				movies: {
					select: {
						external_id: true,
					},
				},
			},
		});

		reply.status(200).send(lists);
	} catch (error) {
		console.error('Error fetching lists:', error);
		reply.status(500).send({ error: 'Failed to fetch lists' });
	}
}
