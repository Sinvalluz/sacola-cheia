import Image from 'next/image';

type ImageBagProps = {
	width: number;
	height: number;
};

export default function ImageBag({ width, height }: ImageBagProps) {
	return (
		<Image
			src={'/Sacola-de-compras.png'}
			alt='Imagem de sacola cheia de compras'
			width={width}
			height={height}
		/>
	);
}
