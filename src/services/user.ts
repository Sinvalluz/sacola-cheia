import { randomInt } from 'node:crypto';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/prisma';
import 'dotenv/config';
import type { UserRequest } from '@/types/user';

export async function createUser(
	email: string,
	name: string,
	password: string,
) {
	const existUserByEmail = await prisma.user.findUnique({ where: { email } });

	if (existUserByEmail) {
		throw new AppError('Email já cadastrado', 409);
	}

	const randomSalt = randomInt(10, 16);
	const passwordHash = await hash(password, randomSalt);

	return await prisma.user.create({
		data: { email, name, password: passwordHash, role: 'USER' },
	});
}

export async function authUser(email: string, password: string) {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) throw new AppError('Email não cadastrado', 400);

	const isValidPassword = await compare(password, user.password);

	if (!isValidPassword) throw new AppError('Senha incorreta', 400);

	const token = jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_SECRET!,
		{
			expiresIn: '24h',
		},
	);

	return token;
}

export async function updateUser(id: number, user: UserRequest, token: string) {
	const userEntity = await prisma.user.findUnique({ where: { id: id } });

	if (!userEntity) throw new AppError('Usuário não encontrado', 404);

	const formattedToken = token.split(' ')[1];

	jwt.verify(formattedToken, process.env.JWT_SECRET!, (err, user) => {
		if (err) throw new AppError('Token não autorizado', 401);

		const decodedUser = user as {
			id: number;
			email: string;
			iat: number;
			exp: number;
		};
		if (decodedUser.id !== id) {
			throw new AppError(
				'Você não tem permissão para atualizar este usuário',
				403,
			);
		}
	});

	await prisma.user.update({
		where: { id: id },
		data: {
			email: user.email,
			name: user.name,
			updatedAt: new Date(),
		},
	});

	const newToken = jwt.sign(
		{ id: userEntity.id, email: user.email },
		process.env.JWT_SECRET!,
		{ expiresIn: '24h' },
	);
	return newToken;
}
