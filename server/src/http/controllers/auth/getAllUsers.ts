import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
	try {
		const users = await prisma.user.findMany();
		reply.status(200).send(users);
	} catch (err) {
		console.error(err);
		reply.status(500).send({ error: 'Error fetching users' });
	}
}
