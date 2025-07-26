import { FastifyReply, FastifyRequest } from 'fastify';
import { addReviewSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';
import { verifyReviewExists } from '../../../lib/review/verifyReviewExists';

export async function addReview(request: FastifyRequest, reply: FastifyReply) {
	const { movieId, content, rating } = addReviewSchema.parse(request.body);
	const { id: userId } = request.user;

	if (!movieId || !content) {
		return reply.status(400).send({ error: 'Movie ID and content are required.' });
	}

	try {
		await prisma.$transaction(async tx => {
			const movie = await tx.movie.findFirst({
				where: {
					external_id: movieId,
				},
			});

			if (!movie) {
				throw new Error('Movie not found');
			}

			const reviewExists = await verifyReviewExists(userId, movie.id);
			if (reviewExists) {
				throw new Error('You have already reviewed this movie.');
			}

			await tx.review.create({
				data: {
					content,
					rating,
					movieId: movie.id,
					userId,
				},
			});
		});

		reply.status(200).send({ message: 'Review created successfuly' });
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'Movie not found') {
				return reply.status(404).send({ error: error.message });
			}
			if (error.message === 'You have already reviewed this movie.') {
				return reply.status(400).send({ error: error.message });
			}
		}
		console.error('Error adding review:', error);
		return reply.status(500).send({ error: 'Failed to add review.' });
	}
}
