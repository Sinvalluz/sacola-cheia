import { randomInt } from 'node:crypto';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/prisma';
import 'dotenv/config';

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
