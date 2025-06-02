import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { id: userId } = request.user;

		if (!userId) {
			return reply.status(401).send({ error: `Unauthorized ${request.user}` });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				username: true,
				role: true,
			},
		});

		if (!user) {
			return reply.status(404).send({ error: 'User not found' });
		}

		reply.status(200).send(user);
	} catch (err) {
		console.error(err);
		reply.status(500).send({ err: 'Error fetching the user' });
	}
}
