import z from 'zod';
import { $Enums } from '../generated/prisma/client';

export const UserCreateSchema = z.object({
	email: z.email('Digite um email válido'),
	name: z.string().min(1, 'Digite um nome válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserCreateRequest = z.infer<typeof UserCreateSchema>;

export const UserResponseSchema = z.object({
	id: z.number(),
	email: z.email(),
	name: z.string(),
	role: z.enum($Enums.Role),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
