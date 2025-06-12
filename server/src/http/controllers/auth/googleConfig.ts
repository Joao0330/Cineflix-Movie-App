import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../../../env';

export function googleConfig(request: FastifyRequest, reply: FastifyReply) {
	const googleClientId = env.GOOGLE_CLIENT_ID;
	const googleClientSecret = env.GOOGLE_CLIENT_SECRET;

	if (!googleClientId || !googleClientSecret) {
		reply.status(500).send({ error: 'Google OAuth configuration is missing' });
		return;
	}

	reply.status(200).send({
		googleClientId,
		googleClientSecret,
	});
}
