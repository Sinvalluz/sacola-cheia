import { randomInt } from 'node:crypto';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../lib/errors/AppError';
import { prisma } from '../lib/prisma';
import type { UserAuthRequest, UserCreateRequest, UserCreateResponse, UserUpdateRequest } from '../schemas/user.schema';
import 'dotenv/config';

export async function createUser(userRequest: UserCreateRequest): Promise<UserCreateResponse> {
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

export async function authUser(userRequest: UserAuthRequest) {
	const user = await prisma.user.findUnique({ where: { email: userRequest.email } });

	if (!user) throw new AppError('Email não cadastrado', 400);

	const isValidPassword = await compare(userRequest.password, user.password);

	if (!isValidPassword) throw new AppError('Senha incorreta', 400);

	const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
		expiresIn: '24h',
	});

	return token;
}

export async function updateUser(id: number, userRequest: UserUpdateRequest, token: string) {
	const userEntity = await prisma.user.findUnique({ where: { id } });

	if (!userEntity) throw new AppError('Usuário não encontrado', 404);

	const emailAlreadyInUse = userRequest.email
		? await prisma.user.findFirst({
				where: {
					email: userRequest.email,
					id: { not: id },
				},
			})
		: null;

	if (emailAlreadyInUse) throw new AppError('Email já está em uso', 409);

	const formattedToken = token.split(' ')[1];

	if (!formattedToken) throw new AppError('Token não enviado', 401);

	jwt.verify(formattedToken, process.env.JWT_SECRET!, (err, user) => {
		if (err) throw new AppError('Token não autorizado', 401);

		const decodedUser = user as {
			id: number;
			email: string;
			iat: number;
			exp: number;
		};
		if (decodedUser.id !== id) {
			throw new AppError('Você não tem permissão para atualizar este usuário', 403);
		}
	});
	await prisma.user.update({
		where: { id: id },
		data: {
			email: userRequest.email ? userRequest.email : userEntity.email,
			name: userRequest.name ? userRequest.name : userEntity.name,
			updatedAt: new Date(),
		},
	});

	return userRequest.email === userEntity.email
		? token
		: jwt.sign({ id: userEntity.id, email: userRequest.email ?? userEntity.email }, process.env.JWT_SECRET!, {
				expiresIn: '24h',
			});
}
