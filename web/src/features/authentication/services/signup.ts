import axios, { type AxiosResponse } from 'axios';
import type { UserRequestRegister, UserResponseRegister } from '@/types/user';

export async function signup(RegisterData: UserRequestRegister) {
	try {
		const { data } = await axios.post<UserRequestRegister, AxiosResponse<UserResponseRegister>>(
			'http://localhost:3000/user',
			RegisterData,
		);

		return data;
	} catch (error) {
		if (error instanceof Error) console.log(`Erro ao fazer a requisição: ${error.message}`);
	}
}
