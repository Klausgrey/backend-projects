import prisma from "../config/prisma.js";

export async function createCourseModel({
	name,
	departmentId,
	levelId,
	capacity,
}) {
	return prisma.courses.create({
		data: { name, department_id: departmentId, level_id: levelId, capacity },
	});
}

// export async function
