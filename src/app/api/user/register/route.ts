import z, { ZodError } from 'zod';
import { AppError } from '@/lib/errors/AppError';
import createUser from '@/services/user';
import { type UserRequest, UserRequestSchema } from '@/types/user';

export async function POST(request: Request) {
	try {
		const body: UserRequest = await request.json();

		UserRequestSchema.parse(body);

		const user = await createUser(body.email, body.name, body.password);

		return new Response(
			JSON.stringify({
				email: user.email,
				name: user.name,
			}),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		if (error instanceof AppError) {
			return new Response(JSON.stringify(error.message), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (error instanceof ZodError) {
			return new Response(
				JSON.stringify(z.flattenError(error).fieldErrors),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
