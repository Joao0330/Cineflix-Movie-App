import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteReviewSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';

export async function deleteReview(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;
	const { reviewId } = deleteReviewSchema.parse(request.body);

	try {
		const deletedReview = await prisma.review.delete({
			where: {
				id: reviewId,
				userId: userId,
			},
		});

		if (!deletedReview) {
			return reply.status(404).send({ error: 'Review not found' });
		}

		reply.status(204).send();
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to delete list' });
	}
}
