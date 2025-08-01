import { env } from '../src/env/index';
import { hash } from 'bcrypt';
import { prisma } from '../src/lib/prisma';

async function createAdmin() {
	const adminEmail = env.ADMIN_EMAIL;
	const adminPassword = env.ADMIN_PASSWORD;

	const hashedPassword = await hash(adminPassword, 6);

	const existingAdmin = await prisma.user.findUnique({
		where: {
			email: adminEmail,
		},
	});

	if (!existingAdmin) {
		await prisma.user.create({
			data: {
				username: 'Admin',
				email: adminEmail,
				password_hash: hashedPassword,
				role: 'ADMIN',
			},
		});
		console.log(`ADMIN created with the email: ${adminEmail}`);
	} else {
		console.log('ADMIN user already exists.');
	}
}

async function main() {
	try {
		await createAdmin();
	} catch (err) {
		console.error('Error executing seed', err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
