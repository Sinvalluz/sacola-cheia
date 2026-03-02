import type { FastifyInstance, FastifyTypeProvider } from 'fastify';

import {
	authUserHandler,
	createUserHandler,
	deleteUserHandler,
	updateUserHandler,
} from '../controllers/user.controller';
import {
	ParamsDeleteSchema,
	ParamsUpdateSchema,
	UserAuthResponseSchema,
	UserAuthSchema,
	UserCreateResponseSchema,
	UserCreateSchema,
	UserUpdateResponseSchema,
	UserUpdateSchema,
} from '../schemas/user.schema';

export async function userRoute(app: FastifyInstance) {
	app.post(
		'/user',
		{
			schema: {
				tags: ['users'],
				description: 'Create new user',
				body: UserCreateSchema,
				response: {
					201: UserCreateResponseSchema,
				},
			},
		},
		createUserHandler,
	);

	app.post(
		'/user/auth',
		{
			schema: {
				tags: ['users'],
				description: 'Authenticates the user',
				body: UserAuthSchema,
				response: {
					200: UserAuthResponseSchema,
				},
			},
		},
		authUserHandler,
	);

	app.put(
		'/user/:id',
		{
			schema: {
				tags: ['users'],
				description: 'Update the user',
				body: UserUpdateSchema,
				params: ParamsUpdateSchema,
				response: {
					200: UserUpdateResponseSchema,
				},
			},
		},
		updateUserHandler,
	);

	app.delete(
		'/user/:id',
		{ schema: { tags: ['users'], description: 'Delete the user', params: ParamsDeleteSchema } },
		deleteUserHandler,
	);
}
