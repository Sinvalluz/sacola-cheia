import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import { Spinner } from '@/components/ui/Spinner';
import { Form } from '@/features/authentication/components/Form';
import { login } from '../services/login';

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

	const navigate = useNavigate();

	const { isPending, mutate } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			console.log(data);
			throw navigate('/');
		},
	});

	function handleInputData(formRegisterData: FormLoginData) {
		mutate({ email: formRegisterData.email, password: formRegisterData.password });
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
				error={errors.password?.message}
				placeholder='Senha'
				type='password'
				{...register('password')}
			/>
			<NavLink
				to={'/'}
				className='text-[14px] self-end text-blue-700'
			>
				Esqueceu sua senha?
			</NavLink>

			<Form.ButtonSubmit>Entrar</Form.ButtonSubmit>
			<NavLink
				to={'/register'}
				className='text-center flex text-xs justify-center gap-1'
			>
				Não possui uma conta?
				<span className='text-blue-700 block'>Criar conta</span>
			</NavLink>
		</Form.Root>
	);
}
