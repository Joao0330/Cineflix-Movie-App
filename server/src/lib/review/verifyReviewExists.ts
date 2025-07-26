import { prisma } from '../prisma';

export async function verifyReviewExists(userId: number, movieId: number) {
	const existingReview = await prisma.review.findUnique({
		where: {
			userId_movieId: {
				userId,
				movieId,
			},
		},
	});

	return existingReview !== null;
}
