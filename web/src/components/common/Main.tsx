import sacolaDeCompras from '@/assets/Sacola-de-compras.png';
import { Button } from '../ui/button';

export default function Main() {
	return (
		<main className='h-full flex flex-col items-center gap-6'>
			<img
				src={sacolaDeCompras}
				width={256}
				height={256}
				alt='Imagem de sacola cheia de compras'
			/>
			<div className='space-y-4 text-center'>
				<h2 className='text-2xl font-semibold text-black dark:text-white'>
					Organize e maximize suas idas ao supermercado.
				</h2>
				<p className='text-base text-black dark:text-white'>
					Planeje sua lista de compras com clareza, evite gastos impulsivos e volte para casa com tudo o que
					precisa
				</p>
			</div>

			<div className='space-x-4'>
				<Button className='cursor-pointer bg-black text-white dark:bg-white dark:text-black'>
					<a href={'/login'}>Login</a>
				</Button>
				<Button className='cursor-pointer bg-white dark:bg-black dark:text-white'>
					<a href={'/register'}>Cadastro</a>
				</Button>
			</div>
		</main>
	);
}
