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

export async function findCourseByNameDeptLevelModel({
	name,
	department_id: departmentId,
	level_id: levelId,
}) {
	return prisma.courses.findFirst({
		where: { name, department_id: departmentId, level_id: levelId },
	});
}

export async function findCourseByIdModel({ courseId }) {
	return prisma.courses.findUnique({ where: { id: courseId } });
}
