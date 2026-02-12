import { randomInt } from 'node:crypto';
import { hash } from 'bcrypt';
import { AppError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/prisma';

export default async function createUser(
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
