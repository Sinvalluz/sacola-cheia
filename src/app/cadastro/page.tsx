import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Cadastro() {
	return (
		<div className='min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex items-center'>
			<div className='px-6 space-y-10'>
				<div className='space-y-2'>
					<h2 className='text-3xl text-center font-bold text-blue-700'>
						criar uma conta
					</h2>
					<p className='text-center'>
						Crie uma conta para poder explorar todas as
						funcionalidades
					</p>
				</div>
				<form
					action=''
					className='space-y-4'
				>
					<Input
						placeholder='Email'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>
					<Input
						placeholder='Nome'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>
					<Input
						placeholder='Senha'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>
					<Input
						placeholder='Confirmar senha'
						className='bg-blue-50 focus-visible:ring-blue-500'
					/>
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
