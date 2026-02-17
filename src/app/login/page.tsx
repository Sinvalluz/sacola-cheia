import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
	return (
		<div className='min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex items-center justify-center'>
			<div className='px-6 space-y-10 w-screen max-w-150'>
				<div className='space-y-2'>
					<h2 className='text-3xl text-center font-bold text-blue-700'>
						Faça login aqui
					</h2>
					<p className='text-center'>
						Bem-vindo de volta! Sentimos sua falta!
					</p>
				</div>
				<form className='flex flex-col gap-4'>
					<Input
						placeholder='Email'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>

					<Input
						placeholder='Senha'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>

					<Link
						href={'/'}
						className='text-[14px] text-end  block'
					>
						Esqueceu sua senha?
					</Link>

					<Button className='w-full bg-blue-700 hover:bg-blue-500 cursor-pointer'>
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
			</div>
		</div>
	);
}
