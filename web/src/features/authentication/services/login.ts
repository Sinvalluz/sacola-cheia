import axios, { type AxiosResponse } from 'axios';
import type { UserRequestLogin, UserResponseLogin } from '@/types/user';

export async function login(loginData: UserRequestLogin) {
	try {
		const { data } = await axios.post<UserRequestLogin, AxiosResponse<UserResponseLogin>>(
			'http://localhost:3000/user/auth',
			loginData,
		);

		return data;
	} catch (error) {
		if (error instanceof Error) console.log(`Erro ao fazer a requisição: ${error.message}`);
	}
}
