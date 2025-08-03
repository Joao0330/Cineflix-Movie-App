import { FastifyReply, FastifyRequest } from 'fastify';

export async function logoutUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		reply.clearCookie('accessToken', {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 0,
		});
		reply.status(200).send({ message: 'Logged out' });
	} catch (error) {
		console.error('Logout error:', error);
		reply.status(500).send({ error: 'Logout failed' });
	}
}
