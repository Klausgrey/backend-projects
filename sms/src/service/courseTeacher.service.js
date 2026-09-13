import {
	createCourseTeacherModel,
	findCourseTeacherLink,
} from "../models/courseTeacher.model.js";
import { findCourseByIdModel } from "../models/course.model.js";
import { findTeacherByIdModel } from "../models/teacher.model.js";
import { fail } from "../utils/helper.js";

export async function createCourseTeacherService({ teacherId, courseId }) {
	const teacher = await findTeacherByIdModel({ teacherId });
	if (!teacher) fail("teacher does not exits");
	const course = await findCourseByIdModel({ courseId });
	if (!course) fail("teacher does not exits");
	const isExisting = await findCourseTeacherLink({ teacherId, courseId });
	if (isExisting) fail("duplicate", 409);

	const data = await createCourseTeacherModel({ teacherId, courseId });

	return data;
}
