import { Moon, Sun } from 'lucide-react';

// import { useTheme } from '../../../contexts/ThemeContext';

const DarkLightBtn = () => {
	// const { darkMode, toggleTheme } = useTheme();
	return (
		<button
			type='button'
			// onClick={toggleTheme}
			className='cursor-pointer'
		>
			{/* {darkMode ? <Moon /> : <Sun className=' text-primary-dark' />} */}
			<Moon />
		</button>
	);
};

export default DarkLightBtn;
