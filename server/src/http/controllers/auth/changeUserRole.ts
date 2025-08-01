import { FastifyReply, FastifyRequest } from 'fastify';
import { changeUserRoleParamsSchema, changeUserRoleSchema } from '../../../schemas/auth.schema';
import { prisma } from '../../../lib/prisma';

export async function changeUserRole(request: FastifyRequest, reply: FastifyReply) {
	const { userId } = changeUserRoleParamsSchema.parse(request.params);
	const { newRole } = changeUserRoleSchema.parse(request.body);

	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: Number(userId),
			},
			data: {
				role: newRole,
			},
		});

		return reply.status(200).send(updatedUser);
	} catch (error) {
		console.error('Error changing user role:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
