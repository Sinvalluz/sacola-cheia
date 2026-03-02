import type { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../lib/errors/AppError';
import type {
	ParamsDeleteRequest,
	ParamsUpdateRequest,
	UserAuthRequest,
	UserCreateRequest,
	UserUpdatePasswordRequest,
	UserUpdateRequest,
} from '../schemas/user.schema';
import { authUser, createUser, deleteUser, updatePassword, updateUser } from '../services/user.service';

export async function createUserHandler(request: FastifyRequest<{ Body: UserCreateRequest }>, reply: FastifyReply) {
	const body = request.body;
	const user = await createUser(body);
	return reply.code(201).send(user);
}

export async function authUserHandler(request: FastifyRequest<{ Body: UserAuthRequest }>, reply: FastifyReply) {
	const body = request.body;
	const token = await authUser(body);
	return reply.send({ token });
}

export async function updateUserHandler(
	request: FastifyRequest<{ Body: UserUpdateRequest; Params: ParamsUpdateRequest }>,
	reply: FastifyReply,
) {
	const body = request.body;

	const id = request.params.id;

	const requestToken = request.headers.authorization;

	if (!requestToken) throw new AppError('Token não enviado', 401);

	const token = await updateUser(id, body, requestToken);

	return reply.send({ token });
}

export async function deleteUserHandler(request: FastifyRequest<{ Params: ParamsDeleteRequest }>, reply: FastifyReply) {
	const id = request.params.id;

	const requestToken = request.headers.authorization;

	if (!requestToken) throw new AppError('Token não enviado', 401);

	await deleteUser(id, requestToken);

	return reply.status(204).send();
}

export async function updatePasswordHandler(
	request: FastifyRequest<{ Body: UserUpdatePasswordRequest; Params: ParamsUpdateRequest }>,
	reply: FastifyReply,
) {
	const id = request.params.id;

	const body = request.body;

	const requestToken = request.headers.authorization;

	if (!requestToken) throw new AppError('Token não enviado', 401);

	await updatePassword(id, body, requestToken);

	return reply.status(204).send();
}
