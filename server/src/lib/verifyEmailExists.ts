import { prisma } from './prisma';

export async function verifyEmailExists(email: string): Promise<boolean> {
	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return existingUser !== null;
}
