import { FastifyReply, FastifyRequest } from 'fastify';
import { banUserSchema } from '../../../schemas/auth.schema';
import { prisma } from '../../../lib/prisma';

export async function banUser(request: FastifyRequest, reply: FastifyReply) {
	const { userId } = request.params as { userId: number };
	const { is_banned } = banUserSchema.parse(request.body);

	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: Number(userId),
			},
			data: {
				is_banned,
			},
		});

		return reply.status(200).send(updatedUser);
	} catch (error) {
		console.error('Error banning user:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
