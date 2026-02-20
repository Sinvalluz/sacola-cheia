import LoginForm from './LoginForm';

export default function Login() {
	return (
		<div className='min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex items-center justify-center'>
			<div className='px-6 space-y-10 w-screen max-w-150'>
				<div className='space-y-2'>
					<h2 className='text-3xl text-center font-bold text-blue-700'>Faça login aqui</h2>
					<p className='text-center'>Bem-vindo de volta! Sentimos sua falta!</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
