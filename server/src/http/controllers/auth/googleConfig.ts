import { FastifyReply, FastifyRequest } from 'fastify';

export function googleConfig(request: FastifyRequest, reply: FastifyReply) {
	const googleClientId = process.env.GOOGLE_CLIENT_ID;
	const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!googleClientId || !googleClientSecret) {
		reply.status(500).send({ error: 'Google OAuth configuration is missing' });
		return;
	}

	reply.status(200).send({
		googleClientId,
		googleClientSecret,
	});
}
