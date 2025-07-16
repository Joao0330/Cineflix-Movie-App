import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prisma';

export async function verifyIsAlreadyFavorite(external_id: string) {
	try {
		const existingFavorite = await prisma.favorites.findUnique({
			where: {
				external_id,
			},
		});

		return existingFavorite !== null;
	} catch (error) {
		console.error('Error verifying favorite:', error);
		throw new Error('Failed to verify favorite');
	}
}
