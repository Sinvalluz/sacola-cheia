import { Eye, EyeClosed } from 'lucide-react';
import { type InputHTMLAttributes, useState } from 'react';
import { Input } from '@/components/ui/Input';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
	error?: string | undefined;
	placeholder: string;
	type: 'email' | 'password' | 'text';
};

export default function FormInput({ error, ...props }: FormInputProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const isPassword = props.type === 'password';
	const inputType = isPassword && showPassword ? 'text' : props.type;
	const Icon = showPassword ? Eye : EyeClosed;
	return (
		<div className='h-14'>
			<div className='relative'>
				<Input
					{...props}
					type={inputType}
					className='bg-blue-50 focus-visible:ring-blue-500 border border-blue-600'
				/>

				{isPassword && (
					<Icon
						className='absolute text-blue-600 top-2 right-2 cursor-pointer'
						width={18}
						onClick={() => setShowPassword(!showPassword)}
						onMouseDown={(e) => e.preventDefault()}
					/>
				)}
			</div>

			{error && (
				<p
					className='text-red-500 text-xs mt-1 
		animate-in fade-in slide-in-from-top-1 duration-300'
				>
					{error}
				</p>
			)}
		</div>
	);
}
