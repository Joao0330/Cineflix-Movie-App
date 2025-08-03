import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteReviewSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';

export async function deleteReview(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId, role } = request.user;
	const { reviewId } = deleteReviewSchema.parse(request.body);

	try {
		const whereCondition = role === 'ADMIN' || role === 'MODERATOR' ? { id: reviewId } : { id: reviewId, userId };

		const deletedReview = await prisma.review.delete({
			where: whereCondition,
		});

		if (!deletedReview) {
			return reply.status(404).send({ error: 'Review not found' });
		}

		return reply.status(204).send();
	} catch (error) {
		console.error(error);
		reply.status(500).send({ error: 'Failed to delete review' });
	}
}
