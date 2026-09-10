import prisma from "../config/prisma.js";

export async function createAdmin({
	email,
	hashedPassword,
	firstName,
	lastName,
}) {
	const result = prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: { email, hashedPassword, firstName, lastName, role: "ADMIN" },
		});

		const admin = await tx.admin.create({
			data: { user_id: user.id },
		});

		return { user, admin };
	});
	return result;
}
