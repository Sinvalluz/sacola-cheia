import z, { ZodError } from 'zod';
import { AppError } from '@/lib/errors/AppError';
import { authUser } from '@/services/user';
import { type UserRequestLogin, UserRequestLoginSchema } from '@/types/user';

export async function POST(request: Request) {
	try {
		const body: UserRequestLogin = await request.json();

		UserRequestLoginSchema.parse(body);

		const token = await authUser(body.email, body.password);

		return new Response(JSON.stringify({ token }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
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

		if (error instanceof Error) {
			return new Response(JSON.stringify(error.message), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}
}
