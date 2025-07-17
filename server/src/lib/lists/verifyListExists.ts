import { prisma } from '../prisma';

export async function verifyListExists(title: string, userId: number): Promise<boolean> {
	try {
		const existingList = await prisma.movieList.findUnique({
			where: {
				userId_title: {
					userId,
					title,
				},
			},
		});

		return existingList !== null;
	} catch (error) {
		console.error('Error verifying Lists:', error);
		throw new Error('Failed to verify Lists');
	}
}
