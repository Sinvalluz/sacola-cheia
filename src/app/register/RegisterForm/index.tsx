'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormInput from '@/components/common/FormInput';
import { Button } from '@/components/ui/button';

const FormDataSchema = z
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

type FormDataSchema = z.infer<typeof FormDataSchema>;

export default function RegisterForm() {
	const { register, handleSubmit, formState } = useForm<FormDataSchema>({
		resolver: zodResolver(FormDataSchema),
	});

	const { errors } = formState;

	function handleInputData(data: FormDataSchema) {
		console.log(data);
	}
	return (
		<form
			className='space-y-1 w-full mt-6'
			onSubmit={handleSubmit(handleInputData)}
		>
			<FormInput
				error={errors.email?.message}
				placeholder='Email'
				type='email'
				{...register('email')}
			/>

			<FormInput
				error={errors.name?.message}
				placeholder='Nome'
				type='text'
				{...register('name')}
			/>

			<FormInput
				placeholder='Senha'
				error={errors.password?.message}
				type='password'
				{...register('password')}
			/>

			<FormInput
				error={errors.confirmPassword?.message}
				placeholder='Confirmar senha'
				type='password'
				{...register('confirmPassword')}
			/>

			<Button
				className='w-full bg-blue-700 hover:bg-blue-500 cursor-pointer'
				type='submit'
			>
				Criar conta
			</Button>

			<Link
				href={'/login'}
				className='text-center flex text-xs justify-center gap-1'
			>
				Já possui uma conta?
				<span className='text-blue-700 block'>login</span>
			</Link>
		</form>
	);
}
