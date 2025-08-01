import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../lib/prisma';

export async function verifyIfBanned(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (user?.is_banned) {
			return reply.status(403).send({ error: 'User is banned.' });
		}
	} catch (error) {
		console.error('Error verifying banned status:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
