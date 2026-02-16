import type { NextRequest } from 'next/server';
import z, { ZodError } from 'zod';
import { AppError } from '@/lib/errors/AppError';
import { updateUser } from '@/services/user';
import { type UserRequest, UserRequestSchema } from '@/types/user';

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const id = Number((await params).id);

		const body: UserRequest = await request.json();

		UserRequestSchema.parse(body);

		const requestToken = request.headers.get('authorization');

		if (!requestToken) throw new AppError('Token não enviado', 401);

		const token = await updateUser(id, body, requestToken);

		return new Response(JSON.stringify({ token }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		if (error instanceof AppError) {
			return new Response(JSON.stringify(error.message), {
				status: error.statusCode,
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
