// import { useTranslation } from 'react-i18next';

import { Button } from './button';

const LanguageButton = () => {
	// const { i18n } = useTranslation();

	// function toggleLanguage() {
	// 	const newLang = i18n.language === 'pt' ? 'en' : 'pt';
	// 	i18n.changeLanguage(newLang);
	// 	localStorage.setItem('lang', newLang);
	// }

	return (
		<Button
			type='button'
			className='cursor-pointer   
               flex gap-2 items-center justify-center bg-transparent hover:bg-black/20 text-black border-2 border-black
			   dark:bg-white/5 dark:hover:bg-white/10 dark:text-white'
			// onClick={toggleLanguage}
		>
			<span
			// className={`transition-opacity ${i18n.language === 'pt' ? 'opacity-100' : 'opacity-40'}`}
			>
				PT
			</span>
			<span className='dark:text-white/30'>|</span>
			<span
			// className={`transition-opacity ${i18n.language === 'en' ? 'opacity-100' : 'opacity-40'}`}
			>
				EN
			</span>
		</Button>
	);
};

export default LanguageButton;
