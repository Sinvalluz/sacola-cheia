import { randomInt } from 'node:crypto';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';

export default async function createUser(
	email: string,
	name: string,
	password: string,
) {
	const randomSalt = randomInt(10, 16);
	const passwordHash = await hash(password, randomSalt);
	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: passwordHash,
			role: 'USER',
		},
	});

	return user;
}
