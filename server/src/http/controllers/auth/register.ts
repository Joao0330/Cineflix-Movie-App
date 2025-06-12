import { FastifyReply, FastifyRequest } from 'fastify';
import { registerSchema } from '../../../schemas/auth.schema';
import { hash } from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { verifyEmailExists } from '../../../lib/auth/verifyEmailExists';
import { verifyUsernameExists } from '../../../lib/auth/verifyUsernameExists';

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
	const newUser = registerSchema.parse(request.body);

	try {
		if (await verifyEmailExists(newUser.email)) {
			return reply.status(409).send({ error: 'This email has already been registered' });
		}

		if (await verifyUsernameExists(newUser.username)) {
			return reply.status(409).send({ error: 'This username is already in use' });
		}

		const hashedPassword = await hash(newUser.password, 6);

		const user = await prisma.user.create({
			data: {
				username: newUser.username,
				email: newUser.email,
				password_hash: hashedPassword,
			},
		});

		reply.status(201).send({ user });
	} catch (error) {
		console.error(error);
		reply.status(409).send({ error: 'Invalid credentials' });
	}
}
