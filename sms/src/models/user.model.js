import prisma from "../config/prisma.js";

export async function findUserbyEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id) {
	return prisma.user.findUnique({ where: { id } });
}

export async function createAdmin({
	email,
	hashedPassword,
	firstName,
	lastName,
}) {
	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: { email, hashedPassword, firstName, lastName, role: "ADMIN" },
		});

		const admin = await tx.admin.create({ data: { user_id: user.id } });
		return { user, admin };
	});
	return result;
}
