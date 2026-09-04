import prisma from "../config/prisma.js";

export async function createTeacher({
	email,
	hashedPassword,
	firstName,
	lastName,
}) {
	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				email,
				hashedPassword,
				firstName,
				lastName,
				role: "TEACHER"
			},
		});

		const teacher = await tx.teacher.create({ data: { user_id: user.id } });

		return { user, teacher };
	});
	return result;
}
