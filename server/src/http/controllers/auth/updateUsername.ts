import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { updateUsernameSchema } from '../../../schemas/auth.schema';
import { verifyUsernameExists } from '../../../lib/auth/verifyUsernameExists';

export async function updateUsername(request: FastifyRequest, reply: FastifyReply) {
	const { username } = updateUsernameSchema.parse(request.body);
	const { id: userId } = request.user;

	try {
		if (await verifyUsernameExists(username)) {
			return reply.status(409).send({ error: 'This username is already in use' });
		}

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { username },
		});

		return reply.status(200).send(updatedUser);
	} catch (error) {
		console.error('Error updating username:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
