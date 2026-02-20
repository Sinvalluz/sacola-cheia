'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import FormInput from '@/components/common/FormInput';
import { Button } from '@/components/ui/button';
import { type FormRegisterData, FormRegisterDataSchema } from '@/types/user';
import postRegister from '@/utils/postRegister';

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormRegisterData>({
		resolver: zodResolver(FormRegisterDataSchema),
	});

	const router = useRouter();

	const { isPending, isSuccess, mutate, data } = useMutation({
		mutationFn: postRegister,
	});

	function handleInputData(formRegisterData: FormRegisterData) {
		mutate({ email: formRegisterData.email, name: formRegisterData.name, password: formRegisterData.password });

		if (isSuccess) {
			console.log(data);
		}

		router.push('/login');
	}

	if (isPending)
		return (
			<ClipLoader
				color={'blue'}
				loading={isPending}
				size={150}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		);

	return (
		<form
			className='flex flex-col gap-4'
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
				className='w-full bg-blue-700 hover:bg-blue-500 cursor-pointer dark:text-white'
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
