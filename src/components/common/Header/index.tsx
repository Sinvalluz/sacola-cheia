import Link from 'next/link';
import DarkLightBtn from '@/components/ui/darkLightBtn';
import GithubIcon from '@/components/ui/githubIcon';
import LanguageButton from '@/components/ui/languageButton';

export default function Header() {
	return (
		<header className='flex justify-between px-6 py-4 border-b border-[#0D0D0D] items-center'>
			<Link href='#'>
				<h1>Sacola cheia</h1>
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
				<LanguageButton />
			</div>
		</header>
	);
}
