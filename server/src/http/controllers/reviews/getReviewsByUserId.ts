import { FastifyReply, FastifyRequest } from 'fastify';
import { getReviewsByUserIdSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';

export async function getReviewsByUserId(request: FastifyRequest, reply: FastifyReply) {
	const { userId } = getReviewsByUserIdSchema.parse(request.params);

	try {
		const reviews = await prisma.review.findMany({
			where: { userId },
			include: {
				movie: {
					select: {
						id: true,
						external_id: true,
					},
				},
				user: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});

		if (reviews.length === 0) {
			return reply.status(404).send({ error: 'No reviews found for this user' });
		}
		reply.status(200).send(reviews);
	} catch (error) {
		console.error('Error fetching user reviews:', error);
		reply.status(500).send({ error: 'Failed to fetch user reviews.' });
	}
}
