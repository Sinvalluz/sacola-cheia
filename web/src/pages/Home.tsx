import { HomeHeader, HomeMain } from '@/features/Home';

export default function Home() {
	return (
		<div className='min-h-screen bg-white dark:bg-black transition-all duration-150'>
			<HomeHeader />
			<HomeMain />
		</div>
	);
}
