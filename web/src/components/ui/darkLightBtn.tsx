import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../providers/theme-provider';
import { Button } from './button';

const DarkLightBtn = () => {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	return (
		<Button
			variant={'outline'}
			size={'icon'}
			type='button'
			onClick={toggleTheme}
			className='cursor-pointer rounded-full border-0 text-black dark:text-white'
		>
			<Sun className='absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
			<Moon className='absolute h-10 w-10 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
		</Button>
	);
};

export default DarkLightBtn;
