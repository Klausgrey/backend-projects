import prisma from "../config/prisma.js";

export async function createCourseTeacherModel({ teacherId, courseId }) {
	return prisma.courseTeacher.create({
		date: { teacher_id: teacherId, course_id: courseId },
	});
}

export async function findCourseTeacherLink({ teacherId, courseId }) {
	return prisma.courseTeacher.findFirst({
		where: { teacher_id: teacherId, course_id: courseId },
	});
}
