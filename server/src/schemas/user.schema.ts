import z from 'zod';
import { $Enums } from '../generated/prisma/client';

// Create User
export const UserCreateSchema = z.object({
	email: z.email('Digite um email válido'),
	name: z.string({ message: 'O nome é obrigatória' }).min(1, 'Digite um nome válido'),
	password: z.string({ message: 'A senha é obrigatória' }).min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserCreateRequest = z.infer<typeof UserCreateSchema>;

export const UserCreateResponseSchema = z.object({
	id: z.number(),
	email: z.email(),
	name: z.string(),
	role: z.enum($Enums.Role),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type UserCreateResponse = z.infer<typeof UserCreateResponseSchema>;

// Auth User
export const UserAuthSchema = z.object({
	email: z.email('Digite um email válido'),
	password: z.string({ message: 'A senha é obrigatória' }).min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserAuthRequest = z.infer<typeof UserAuthSchema>;

export const UserAuthResponseSchema = z.object({
	token: z.string(),
});

export type UserAuthResponse = z.infer<typeof UserAuthResponseSchema>;

// Update User
export const UserUpdateSchema = UserCreateSchema.omit({ password: true }).partial();

export type UserUpdateRequest = z.infer<typeof UserUpdateSchema>;

export const UserUpdateResponseSchema = z.object({
	token: z.string(),
});

export const ParamsUpdateSchema = z.object({
	id: z.coerce
		.number('digite um número valido como parâmetro')
		.int('O id como parâmetro deve ser um número inteiro')
		.positive('O id como parâmetro deve ser positivo'),
});

export type ParamsUpdateRequest = z.infer<typeof ParamsUpdateSchema>;
