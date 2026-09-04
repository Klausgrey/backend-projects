import prisma from "../config/prisma.js";

export async function createStudent({
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
				role: "STUDENT",
			},
		});
		const student = await tx.student.create({
			user_id: user.id,
			department_id,
			level_id,
		});
		return { user, student };
	});
	return result;
}
