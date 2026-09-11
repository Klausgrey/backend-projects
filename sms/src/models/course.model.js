import prisma from "../config/prisma.js";

export async function createCourseModel({ departmentId, levelId, capacity }) {
	prisma.courses.create({
		data: { department_id: departmentId, level_id: levelId, capacity },
	});
}

// export async function
