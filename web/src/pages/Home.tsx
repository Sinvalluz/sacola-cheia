import HomeHeader from '@/components/common/Home/HomeHeader';
import HomeMain from '@/components/common/Home/HomeMain';

export default function Home() {
	return (
		<div className='min-h-screen bg-white dark:bg-black transition-all duration-150'>
			<HomeHeader />
			<HomeMain />
		</div>
	);
}
