import Header from './components/common/Header';
import Main from './components/common/Main';

export default function App() {
	return (
		<div className='min-h-screen bg-white dark:bg-black transition-all duration-150'>
			<Header />
			<Main />
		</div>
	);
}
