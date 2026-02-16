import Header from '@/components/common/Header';
import ImageBag from '@/components/ui/imageBag';

export default function Home() {
	return (
		<div className='min-h-screen w-full'>
			<Header />
			<ImageBag
				height={256}
				width={256}
			/>
			<h1>Sacola cheia</h1>
			<h2>Organize e maximize suas idas ao supermercado.</h2>
			<p>
				Planeje sua lista de compras com clareza, evite gastos
				impulsivos e volte para casa com tudo o que precisa
			</p>
		</div>
	);
}
