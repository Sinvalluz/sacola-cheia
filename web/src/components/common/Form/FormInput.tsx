import { Eye, EyeClosed } from 'lucide-react';
import { type InputHTMLAttributes, useState } from 'react';
import { Input } from '@/components/ui/input';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
	error?: string | undefined;
};

export default function FormInput({ error, placeholder, type }: FormInputProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const isPassword = type === 'password';
	const inputType = isPassword && showPassword ? 'text' : type;
	const Icon = showPassword ? Eye : EyeClosed;
	return (
		<div>
			<div className='relative'>
				<Input
					type={inputType}
					className='bg-blue-50 focus-visible:ring-blue-500 border border-blue-600'
					placeholder={placeholder}
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
		</div>
	);
}
