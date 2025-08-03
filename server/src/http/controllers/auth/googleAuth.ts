import { FastifyReply, FastifyRequest } from 'fastify';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../../lib/prisma';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleAuth(request: FastifyRequest, reply: FastifyReply) {
	const { token } = request.body as { token: string };

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		if (!payload || !payload.email || !payload.sub) {
			reply.status(400).send({ error: 'Invalid Google token payload' });
			return;
		}
		const { email, sub: googleId } = payload;

		let user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			user = await prisma.user.create({
				data: {
					username: email.split('@')[0], // Use email prefix as username
					email,
					password_hash: '', // No password for Google users
					googleId, // Optional: store Google ID for reference
				},
			});
		}

		const accessToken = await reply.jwtSign({ id: user.id, role: user.role });

		reply.setCookie('accessToken', accessToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
		});

		reply.status(200).send({ accessToken });
	} catch (error) {
		console.error('Google auth error:', error);
		reply.status(401).send({ error: 'Invalid Google token' });
	}
}
