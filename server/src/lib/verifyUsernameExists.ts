import { prisma } from './prisma';

export async function verifyUsernameExists(username: string): Promise<boolean> {
	const existingUser = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	return existingUser !== null;
}
