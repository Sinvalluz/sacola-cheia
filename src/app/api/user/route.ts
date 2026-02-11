import z from 'zod';
import createUser from '@/services/user/createUser';
import { type UserRequest, UserRequestSchema } from '@/types/user';

export async function POST(request: Request) {
	try {
		const body: UserRequest = await request.json();

		const validation = UserRequestSchema.safeParse(body);

		if (!validation.success) {
			return new Response(
				JSON.stringify({
					erros: z.flattenError(validation.error).fieldErrors,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

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
		console.log(error);
		return new Response(`Erro ao criar o usuário`, {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
