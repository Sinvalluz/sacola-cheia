import { NavLink } from 'react-router';
import { Form } from '../Form';

export default function RegisterForm() {
	return (
		<Form.Root>
			<Form.Input
				placeholder='Email'
				type='email'
			/>
			<Form.Input
				placeholder='Nome'
				type='text'
			/>
			<Form.Input
				placeholder='Senha'
				type='password'
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
