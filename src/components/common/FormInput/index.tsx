import type { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import ErrorForm from '../ErrorForm';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
	error?: string | undefined;
};

export default function FormInput({ error, ...props }: FormInputProps) {
	return (
		<div className='h-16'>
			<Input
				className='bg-blue-50 focus-visible:ring-blue-500 border border-blue-600'
				{...props}
			/>
			{error && <ErrorForm>{error}</ErrorForm>}
		</div>
	);
}
