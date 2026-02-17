import Header from '@/components/common/Header';
import Main from '@/components/common/Main';

export default function Home() {
	return (
		<div className='min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-all duration-300'>
			<Header />
			<Main />
		</div>
	);
}
