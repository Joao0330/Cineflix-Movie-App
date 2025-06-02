import { FastifyReply, FastifyRequest } from 'fastify';
import { loginSchema } from '../../../schemas/auth.schema';
import { prisma } from '../../../lib/prisma';
import { compare } from 'bcrypt';
import { env } from '../../../env';
import { app } from '../../../app';

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
	const { email, password } = loginSchema.parse(request.body);

	try {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !(await compare(password, user.password_hash))) {
			return reply.status(401).send({ error: 'Invalid credentials' });
		}

		const accessToken = await reply.jwtSign({ id: user.id, role: user.role });

		reply.setCookie('accessToken', accessToken, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
		});
		reply.status(200).send({ accessToken });
	} catch (error) {
		reply.status(500).send({ error: 'Error logging in' });
	}
}
