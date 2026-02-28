import type { FastifyInstance } from 'fastify';
import { authUserHandler, createUserHandler, updateUserHandler } from '../controllers/user.controller';
import {
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
				response: {
					200: UserUpdateResponseSchema,
				},
			},
		},
		updateUserHandler,
	);
}
