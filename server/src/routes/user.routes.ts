import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { authUserHandler, createUserHandler } from '../controllers/user.controller';
import { UserAuthResponseSchema, UserAuthSchema, UserCreateSchema, UserResponseSchema } from '../schemas/user.schema';

export async function userRoute(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: '/user',
		schema: {
			body: UserCreateSchema,
			response: {
				200: UserResponseSchema,
			},
		},
		handler: createUserHandler,
	});

	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: '/user/auth',
		schema: {
			body: UserAuthSchema,
			response: {
				200: UserAuthResponseSchema,
			},
		},
		handler: authUserHandler,
	});
}
