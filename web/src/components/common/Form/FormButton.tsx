import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type FormButtonProps = { children: ReactNode };

export default function FormButton({ children }: FormButtonProps) {
	return (
		<Button
			className='w-full bg-blue-700 hover:bg-blue-500 cursor-pointer dark:text-white'
			type='submit'
		>
			{children}
		</Button>
	);
}
