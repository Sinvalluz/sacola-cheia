import type { FormHTMLAttributes, ReactNode } from 'react';

type FormRootProps = FormHTMLAttributes<HTMLFormElement> & {
	children: ReactNode;
};

export default function FormRoot({ children, ...props }: FormRootProps) {
	return (
		<form
			className='flex flex-col gap-3'
			{...props}
		>
			{children}
		</form>
	);
}
