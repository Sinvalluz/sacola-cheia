import Link from 'next/link';
import DarkLightBtn from '@/components/ui/darkLightBtn';
import GithubIcon from '@/components/ui/githubIcon';

export default function Header() {
	return (
		<header className='flex justify-between px-6 py-4 items-center'>
			<Link href='/'>
				<h1 className='text-2xl font-semibold'>Sacola cheia</h1>
			</Link>
			<div className='flex gap-4 items-center'>
				<DarkLightBtn />
				<Link
					href='https://github.com/Sinvalluz/sacola-cheia'
					target='_blank'
					rel='noreferrer'
				>
					<GithubIcon />
				</Link>
			</div>
		</header>
	);
}
