import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../../lib/prisma';
import { OAuth2Client } from 'google-auth-library';

export async function googleAuth(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { token } = request.body as { token: string };
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

		// Verify Google ID token
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		if (!payload) {
			return reply.status(401).send({ error: 'Invalid Google token' });
		}

		const { sub: googleId, email, name } = payload;

		let user = await prisma.user.findUnique({ where: { googleId } });
		if (!user) {
			user = await prisma.user.create({
				data: {
					googleId,
					email: email!,
					username: email!.split('@')[0],
					password_hash: '',
					role: 'USER',
				},
			});
		}

		// Generate JWT
		const jwtToken = request.server.jwt.sign({ id: user.id }, { expiresIn: '1h' });
		reply.setCookie('accessToken', jwtToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 3600, // 1 hour
		});

		reply.status(200).send({ user });
	} catch (error) {
		console.error('Google auth error:', error);
		reply.status(500).send({ error: 'Authentication failed' });
	}
}
