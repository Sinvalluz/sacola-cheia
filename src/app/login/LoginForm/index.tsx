'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormInput from '@/components/common/FormInput';
import { Button } from '@/components/ui/button';

const FormLoginDataSchema = z.object({
	email: z.email('Digite um email válido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type FormLoginData = z.infer<typeof FormLoginDataSchema>;

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLoginData>({
		resolver: zodResolver(FormLoginDataSchema),
	});

	function handleLoginSubmit(data: FormLoginData) {
		console.log(data);
	}
	return (
		<form
			className='flex flex-col gap-4'
			onSubmit={handleSubmit(handleLoginSubmit)}
		>
			<FormInput
				placeholder='Email'
				className='bg-blue-50 focus-visible:ring-blue-500'
				error={errors.email?.message}
				{...register('email')}
			/>

			<FormInput
				placeholder='Senha'
				error={errors.password?.message}
				className='bg-blue-50 focus-visible:ring-blue-500'
				{...register('password')}
			/>

			<Link
				href={'/'}
				className='text-[14px] text-end  block'
			>
				Esqueceu sua senha?
			</Link>

			<Button
				className='w-full bg-blue-700 hover:bg-blue-500 cursor-pointer dark:text-white'
				type='submit'
			>
				Entrar
			</Button>
			<Link
				href={'/register'}
				className='text-center flex text-xs justify-center gap-1'
			>
				Não possui uma conta?
				<span className='text-blue-700 block'>Criar conta</span>
			</Link>
		</form>
	);
}
