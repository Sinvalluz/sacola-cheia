import RegisterForm from './RegisterForm';

export default function Register() {
	return (
		<div className='min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex items-center justify-center'>
			<div className='px-6'>
				<div className='space-y-2'>
					<h2 className='text-3xl text-center font-bold text-blue-700'>criar uma conta</h2>
					<p className='text-center'>Crie uma conta para poder explorar todas as funcionalidades</p>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
