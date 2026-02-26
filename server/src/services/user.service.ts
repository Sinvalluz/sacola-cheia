import { randomInt } from 'node:crypto';
import { hash } from 'bcrypt';
import { AppError } from '../lib/errors/AppError';
import { prisma } from '../lib/prisma';
import type { UserCreateRequest, UserResponse } from '../schemas/user.schema';

export async function createUser(userRequest: UserCreateRequest): Promise<UserResponse> {
	const existUserByEmail = await prisma.user.findUnique({
		where: { email: userRequest.email },
	});

	if (existUserByEmail) {
		throw new AppError('Email já cadastrado', 409);
	}

	const randomSalt = randomInt(10, 16);
	const passwordHash = await hash(userRequest.password, randomSalt);

	return await prisma.user.create({
		data: {
			email: userRequest.email,
			name: userRequest.name,
			password: passwordHash,
			role: 'USER',
		},
		omit: { password: true },
	});
}
