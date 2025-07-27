import { FastifyReply, FastifyRequest } from 'fastify';
import { getMovieReviewsSchema } from '../../../schemas/review.schema';
import { prisma } from '../../../lib/prisma';

export async function getMovieReviews(request: FastifyRequest, reply: FastifyReply) {
	const { movieId: externalId } = getMovieReviewsSchema.parse(request.params);

	if (!externalId) {
		return reply.status(400).send({ error: 'Movie ID is required.' });
	}

	try {
		const movie = await prisma.movie.findFirst({
			where: { external_id: Number(externalId) },
		});

		if (!movie) {
			return reply.status(404).send({ error: 'Movie not found' });
		}

		const reviews = await prisma.review.findMany({
			where: {
				movieId: movie.id,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
					},
				},
			},
			orderBy: {
				created_at: 'desc',
			},
		});

		return reply.status(200).send(reviews ?? []);
	} catch (error) {
		console.error('Error fetching movie reviews:', error);
		return reply.status(500).send({ error: 'Failed to fetch reviews.' });
	}
}
