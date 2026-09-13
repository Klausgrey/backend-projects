import {
	createCourseModel,
	findCourseByNameDeptLevelModel,
} from "../models/course.model.js";
import { findDepartmentById } from "../models/department.model.js";
import { findLevelById } from "../models/level.model.js";
import { fail } from "../utils/helper.js";

export async function createCourseService({
	name,
	departmentId,
	levelId,
	capacity,
}) {
	// check if id passed even exists first before creating
	const department = await findDepartmentById({ id: departmentId });
	if (!department) fail("this department does not exists", 404);
	const level = await findLevelById({ id: levelId });
	if (!level) fail("this level does not exists", 404);
	const isExisting = await findCourseByNameDeptLevelModel({
		name,
		departmentId,
		levelId,
	});
	if (isExisting)
		fail("this course already exists in this department and level", 409);

	const data = await createCourseModel({
		name,
		departmentId,
		levelId,
		capacity,
	});
	return data;
}
