import prisma from "../config/prisma.js";

export async function createAdmin({
	email,
	hashedpassword,
	firstName,
	LastName,
}) {
	const result = prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: { email, hashedpassword, firstName, LastName, role: "ADMIN" },
		});

		const admin = await tx.admin.create({
			data: { user_id: user.id },
		});

		return { user, admin };
	});
	return result;
}
