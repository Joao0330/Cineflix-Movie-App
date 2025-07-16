import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prisma';

export async function verifyIsAlreadyAdded(external_id: string, actionType: 'favorite' | 'movieList'): Promise<boolean> {
	try {
		let existingItem = null;

		if (actionType === 'favorite') {
			existingItem = await prisma.favorites.findUnique({
				where: {
					external_id,
				},
			});
		} else {
			existingItem = await prisma.movieList.findUnique({
				where: {
					external_id,
				},
			});
		}

		return existingItem !== null;
	} catch (error) {
		console.error('Error verifying favorite:', error);
		throw new Error('Failed to verify favorite');
	}
}
