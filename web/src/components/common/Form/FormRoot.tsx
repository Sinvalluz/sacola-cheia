import type { ReactNode } from 'react';

type FormRootProps = {
	children: ReactNode;
};

export default function FormRoot({ children }: FormRootProps) {
	return <form className='flex flex-col gap-4'>{children}</form>;
}
