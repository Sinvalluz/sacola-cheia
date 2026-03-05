import type { ReactNode } from 'react';

type ErrorFormProps = {
	children: ReactNode;
};

export default function FormError({ children }: ErrorFormProps) {
	return <p className='text-red-500 text-xs mt-1'>{children}</p>;
}
