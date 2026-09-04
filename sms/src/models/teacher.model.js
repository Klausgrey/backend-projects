import prisma from "../config/prisma.js";

export async function createTeacher({
	email,
	hashedpassword,
	firstName,
	LastName,
}) {
	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				email,
				hashedpassword,
				firstName,
				LastName,
			},
		});

		const teacher = await tx.teacher.create({ data: { user_id: user.id } });

		return { user, teacher };
	});
	return result;
}
