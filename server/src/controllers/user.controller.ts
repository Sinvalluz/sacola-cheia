import type { FastifyReply, FastifyRequest } from 'fastify';
import type { UserCreateRequest } from '../schemas/user.schema';
import { createUser } from '../services/user.service';

export async function createUserHandler(request: FastifyRequest<{ Body: UserCreateRequest }>, reply: FastifyReply) {
	const body = request.body;
	const user = await createUser(body);
	reply.send(user);
}
