import type { FastifyInstance, FastifyTypeProvider } from 'fastify';

import { authUserHandler, createUserHandler, updateUserHandler } from '../controllers/user.controller';
import {
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

	app.withTypeProvider<FastifyTypeProvider>().put(
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
}
