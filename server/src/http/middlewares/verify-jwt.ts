import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
	try {
		console.log('Cookies received:', request.cookies);
		await request.jwtVerify();
		if (!request.user) {
			return reply.status(401).send({ error: 'Unauthorized: No user found in token' });
		}
	} catch (error) {
		console.error('JWT verification error:', error);
		return reply.status(401).send({ error: 'Invalid token' });
	}
}
