import { prisma } from '../prisma';

export async function verifyMovieExists(listId: number, external_id: number) {
	const existingMovie = await prisma.movie.findFirst({
		where: {
			movieListId: listId,
			external_id: external_id,
		},
	});

	return existingMovie !== null;
}
