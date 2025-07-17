import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { addListSchema } from '../../../schemas/list.schema';
import { verifyListExists } from '../../../lib/lists/verifyListExists';

export async function addList(request: FastifyRequest, reply: FastifyReply) {
	const { title } = addListSchema.parse(request.body);
	const { id: userId } = request.user;

	try {
		if (await verifyListExists(title, userId)) {
			return reply.status(409).send({ error: 'A list with this title already exists.' });
		}

		const newList = await prisma.movieList.create({
			data: {
				title,
				userId,
			},
			select: {
				id: true,
				title: true,
				status: true,
				created_at: true,
			},
		});

		reply.status(201).send({ list: newList });
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to create list' });
	}
}
