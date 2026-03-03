import type { FastifyInstance } from 'fastify';
import z from 'zod';
import {
	authUserHandler,
	createUserHandler,
	deleteUserHandler,
	updatePasswordHandler,
	updateUserHandler,
} from '../controllers/user.controller.js';
import {
	ParamsDeleteSchema,
	ParamsUpdateSchema,
	UserAuthResponseSchema,
	UserAuthSchema,
	UserCreateResponseSchema,
	UserCreateSchema,
	UserUpdatePasswordSchema,
	UserUpdateResponseSchema,
	UserUpdateSchema,
} from '../schemas/user.schema.js';

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
				security: [
					{
						bearerAuth: [],
					},
				],
			},
		},
		updateUserHandler,
	);

	app.delete(
		'/user/:id',
		{
			schema: {
				tags: ['users'],
				description: 'Delete the user',
				params: ParamsDeleteSchema,
				response: {
					204: z.void(),
				},
				security: [
					{
						bearerAuth: [],
					},
				],
			},
		},
		deleteUserHandler,
	);

	app.put(
		'/user/password/:id',
		{
			schema: {
				tags: ['users'],
				description: 'Delete the user',
				params: ParamsUpdateSchema,
				body: UserUpdatePasswordSchema,
				security: [
					{
						bearerAuth: [],
					},
				],
				response: {
					204: z.void(),
				},
			},
		},
		updatePasswordHandler,
	);
}
