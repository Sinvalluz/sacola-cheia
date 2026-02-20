import { z } from 'zod';

export const UserRequestSchema = z.object({
	email: z.email('digite um email válido'),
	name: z.string().min(1, 'Digite um nome válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserRequest = z.infer<typeof UserRequestSchema>;

export const UserRequestLoginSchema = z.object({
	email: z.email('digite um email válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type UserRequestLogin = z.infer<typeof UserRequestLoginSchema>;

export const FormRegisterDataSchema = z
	.object({
		email: z.email('Digite um email válido'),
		name: z.string().min(1, 'Digite um nome válido'),
		password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
		confirmPassword: z.string().min(6, 'A confirmação de senha deve ter no mínimo 6 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não conferem',
		path: ['confirmPassword'],
	});

export type FormRegisterData = z.infer<typeof FormRegisterDataSchema>;

export type UserResponse = {
	email: string;
	name: string;
};

export type UserRegisterRequest = z.infer<typeof UserRequestSchema>;
