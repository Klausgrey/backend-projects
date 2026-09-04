import prisma from "../config/prisma.js";

export async function createStudent({
	email,
	hashedPassword,
	firstName,
	lastName,
	department_id,
	level_id,
}) {
	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				email,
				hashedPassword,
				firstName,
				lastName,
				role: "STUDENT",
			},
		});
		const student = await tx.student.create({
			data: {
				user_id: user.id,
				department_id,
				level_id,
			},
			include: { department: true, level: true },
		});
		return { user, student };
	});
	return result;
}
