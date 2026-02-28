import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { AppError } from './lib/errors/AppError';
import { userRoute } from './routes/user.routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'API Sacola Cheia',
			description: 'Documentação da API do site Sacola cheia',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({ message: error.message });
	}

	console.error(error);

	return reply.status(500).send({
		message: 'Internal Server Error',
	});
});

app.register(userRoute);

app.listen({ port: 3000 }).then(() => console.log('Server running on http://localhost:3000'));
