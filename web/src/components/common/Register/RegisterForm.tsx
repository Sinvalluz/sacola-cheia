import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import postRegister from '@/services/postRegister';
import { Form } from '../Form';

const FormRegisterDataSchema = z
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

type FormRegisterData = z.infer<typeof FormRegisterDataSchema>;

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormRegisterData>({
		resolver: zodResolver(FormRegisterDataSchema),
	});

	const navigate = useNavigate();

	const { isPending, mutate } = useMutation({
		mutationFn: postRegister,
		onSuccess: (data) => {
			console.log(data);
			throw navigate('/');
		},
	});

	function handleInputData(formRegisterData: FormRegisterData) {
		mutate({ email: formRegisterData.email, name: formRegisterData.name, password: formRegisterData.password });
	}

	if (isPending) return <Spinner className='m-auto' />;

	return (
		<Form.Root onSubmit={handleSubmit(handleInputData)}>
			<Form.Input
				error={errors.email?.message}
				placeholder='Email'
				type='email'
				{...register('email')}
			/>

			<Form.Input
				error={errors.name?.message}
				placeholder='Nome'
				type='text'
				{...register('name')}
			/>

			<Form.Input
				error={errors.password?.message}
				placeholder='Senha'
				type='password'
				{...register('password')}
			/>

			<Form.Input
				error={errors.confirmPassword?.message}
				placeholder='Confirmar senha'
				type='password'
				{...register('confirmPassword')}
			/>

			<Form.ButtonSubmit>Criar conta</Form.ButtonSubmit>
			<NavLink
				to={'/login'}
				className='text-center flex text-xs justify-center gap-1'
			>
				Já possui uma conta?
				<span className='text-blue-700 block'>login</span>
			</NavLink>
		</Form.Root>
	);
}
