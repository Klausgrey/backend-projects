import { createCourseModel } from "../models/course.model.js";
import { findDepartmentById } from "../models/department.model.js";
import { findLevelByIdById } from "../models/level.model.js";
import { fail } from "../utils/helper.js";

export async function createCourseService({ departmentId, levelId, capacity }) {
	// check if id passed even exists first before creating
	const department = await findDepartmentById({ id: departmentId });
	if (!department) fail("this department does not exists", 404);
	const level = await findLevelByIdById({ id: levelId });
	if (!level) fail("this level does not exists", 404);

	const data = await createCourseModel({
		departmentId,
		levelId,
		capacity,
	});
	return { data };
}
