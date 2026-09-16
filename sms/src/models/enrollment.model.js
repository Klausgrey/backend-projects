import prisma from "../config/prisma.js";

export async function createEnrollmentModel({
	studentId,
	courseId,
	status,
	semesterId,
}) {
	return prisma.enrollment.create({
		data: {
			student_id: studentId,
			course_id: courseId,
			status,
			semester_id: semesterId,
		},
	});
}

export async function findStudentCourseSemesterLink({
	studentId,
	courseId,
	semesterId,
}) {
	return prisma.enrollment.findFirst({
		where: {
			student_id: studentId,
			course_id: courseId,
			semester_id: semesterId,
		},
	});
}
