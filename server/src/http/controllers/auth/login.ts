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

		const token = request.server.jwt.sign({ id: user.id, role: user.role }, { expiresIn: '1h' });
		reply.setCookie('accessToken', token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 3600,
		});
		reply.status(200).send({ user });
	} catch (error) {
		reply.status(500).send({ error: 'Error logging in' });
	}
}
