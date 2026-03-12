import DarkLightBtn from '@/components/ui/DarkLightBtn';
import GithubIcon from '@/components/ui/GithubIcon';

export default function HomeHeader() {
	return (
		<header className='flex justify-between px-6 py-4 items-center'>
			<a href='/'>
				<h1 className='text-2xl font-semibold text-black dark:text-white'>Sacola cheia</h1>
			</a>
			<div className='flex gap-4 items-center'>
				<DarkLightBtn />
				<a
					href='https://github.com/Sinvalluz/sacola-cheia'
					target='_blank'
					rel='noreferrer'
				>
					<GithubIcon className='text-black dark:text-white' />
				</a>
			</div>
		</header>
	);
}
