import axios from 'axios';
import type { UserRegisterRequest, UserResponse } from '@/types/user';

export default async function postRegister(RegisterData: UserRegisterRequest) {
	try {
		const response: UserResponse = await axios.post<UserRegisterRequest, UserResponse>(
			'/api/user/register',
			RegisterData,
		);

		return response;
	} catch (error) {
		if (error instanceof Error) console.log(`Erro ao fazer a requisição: ${error.message}`);
	}
}
