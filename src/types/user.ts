import { z } from 'zod';

export const UserRequestSchema = z.object({
	email: z.email('digite um email válido'),
	name: z.string().min(1, 'Digite um nome válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserRequest = z.infer<typeof UserRequestSchema>;
