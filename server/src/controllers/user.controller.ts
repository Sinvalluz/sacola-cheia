import type { FastifyReply, FastifyRequest } from 'fastify';
import type { UserAuthRequest, UserCreateRequest } from '../schemas/user.schema';
import { authUser, createUser } from '../services/user.service';

export async function createUserHandler(request: FastifyRequest<{ Body: UserCreateRequest }>, reply: FastifyReply) {
	const body = request.body;
	const user = await createUser(body);
	reply.send(user);
}

export async function authUserHandler(request: FastifyRequest<{ Body: UserAuthRequest }>, reply: FastifyReply) {
	const body = request.body;
	const token = await authUser(body);
	reply.send({ token });
}
