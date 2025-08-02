import { FastifyReply, FastifyRequest } from 'fastify';
import { searchUserParams } from '../../../schemas/auth.schema';
import { prisma } from '../../../lib/prisma';

export async function searchUser(request: FastifyRequest, reply: FastifyReply) {
	const { userId } = searchUserParams.parse(request.params);

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				profile_picture_url: true,
				role: true,
				created_at: true,
			},
		});

		if (!user) {
			return reply.status(404).send({ error: 'User not found' });
		}

		return reply.status(200).send(user);
	} catch (error) {
		console.error('Error searching user:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
