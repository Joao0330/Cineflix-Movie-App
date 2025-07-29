import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { getMovieReviewsSchema } from '../../../schemas/review.schema';

export async function getUserReviews(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;

	try {
		const reviews = await prisma.review.findMany({
			where: { userId },
			select: {
				id: true,
				content: true,
				rating: true,
				created_at: true,
				movie: {
					select: {
						id: true,
						external_id: true,
					},
				},
			},
		});

		reply.status(200).send(reviews);
	} catch (error) {
		console.error('Error fetching user reviews:', error);
		reply.status(500).send({ error: 'Failed to fetch user reviews.' });
	}
}
