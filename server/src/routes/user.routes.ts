import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
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
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: '/user',
		schema: {
			tags: ['users'],
			description: 'Create new user',
			body: UserCreateSchema,
			response: {
				201: UserCreateResponseSchema,
			},
		},
		handler: createUserHandler,
	});

	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: '/user/auth',
		schema: {
			tags: ['users'],
			description: 'Authenticates the user',
			body: UserAuthSchema,
			response: {
				200: UserAuthResponseSchema,
			},
		},
		handler: authUserHandler,
	});

	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'PUT',
		url: '/user/:id',
		schema: {
			tags: ['users'],
			description: 'Update the user',
			body: UserUpdateSchema,
			response: {
				200: UserUpdateResponseSchema,
			},
		},
		handler: updateUserHandler,
	});
}
