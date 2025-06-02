import { FastifyReply, FastifyRequest } from 'fastify';

export async function logoutUser(request: FastifyRequest, reply: FastifyReply) {
	reply.clearCookie('accessToken', {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
	});
	return reply.send({ message: 'Logged out' });
}
