import { FastifyReply, FastifyRequest } from 'fastify';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../../../lib/prisma';
import { Readable } from 'stream';

export async function uploadProfilePic(request: FastifyRequest, reply: FastifyReply) {
	const { id: userId } = request.user;
	const profilePicture = await request.file();

	if (!profilePicture) {
		return reply.status(400).send({ error: 'Profile picture is required' });
	}

	try {
		const chunks: Buffer[] = [];
		for await (const chunk of profilePicture.file) {
			chunks.push(chunk);
		}
		const fileBuffer = Buffer.concat(chunks);

		const uploadResult: any = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream({ folder: 'profile_pics', resource_type: 'image' }, (error, result) => {
				if (error || !result) return reject(error || new Error('No result from Cloudinary'));
				resolve(result);
			});

			const readableStream = new Readable();
			readableStream.push(fileBuffer);
			readableStream.push(null);
			readableStream.pipe(stream);
		});

		if (!uploadResult.secure_url) {
			throw new Error('Failed to retrieve secure URL from Cloudinary');
		}

		await prisma.user.update({
			where: { id: userId },
			data: { profile_picture_url: uploadResult.secure_url },
		});

		return reply.send({ url: uploadResult.secure_url });
	} catch (error) {
		console.error('Error uploading profile picture:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}
