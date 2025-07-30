import { FastifyReply, FastifyRequest } from 'fastify';
import { updateReviewBodySchema, updateReviewParamsSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';

export async function updateReview(request: FastifyRequest, reply: FastifyReply) {
	const { reviewId } = updateReviewParamsSchema.parse(request.params);
	const { rating, content } = updateReviewBodySchema.parse(request.body);

	try {
		const updatedReview = await prisma.review.update({
			where: {
				id: Number(reviewId),
			},
			data: {
				rating,
				content,
			},
		});

		return reply.status(200).send(updatedReview);
	} catch (error) {
		console.error('Error updating review:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
