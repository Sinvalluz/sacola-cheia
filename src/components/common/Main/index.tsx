import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ImageBag from '@/components/ui/imageBag';

export default function Main() {
	return (
		<main className='h-full flex flex-col items-center gap-6'>
			<ImageBag
				height={256}
				width={256}
			/>
			<div className='space-y-4 text-center'>
				<h2 className='text-2xl font-semibold'>Organize e maximize suas idas ao supermercado.</h2>
				<p className='text-base'>
					Planeje sua lista de compras com clareza, evite gastos impulsivos e volte para casa com tudo o que
					precisa
				</p>
			</div>

			<div className='space-x-4'>
				<Button className='cursor-pointer'>
					<Link href={'/login'}>Login</Link>
				</Button>
				<Button
					className='cursor-pointer'
					variant={'secondary'}
				>
					<Link href={'/register'}>Cadastro</Link>
				</Button>
			</div>
		</main>
	);
}
