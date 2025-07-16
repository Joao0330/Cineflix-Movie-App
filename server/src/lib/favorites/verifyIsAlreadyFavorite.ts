import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prisma';

export async function verifyIsAlreadyFavorite(external_id: string, userId: number): Promise<boolean> {
	try {
		const existingFavorite = await prisma.favorites.findUnique({
			where: {
				userId_external_id: {
					userId,
					external_id,
				},
			},
		});

		return existingFavorite !== null;
	} catch (error) {
		console.error('Error verifying favorite:', error);
		throw new Error('Failed to verify favorite');
	}
}
