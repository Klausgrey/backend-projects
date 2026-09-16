import { createCourseService, getCourses as getCoursesRecords } from "../service/course.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createCourseController(req, res, next) {
	try {
		// const { name, departmentId, levelId, capacity } = req.body;
		const data = await createCourseService(req.body);
		return sendSuccess(res, 201, data, "course created successfully");
	} catch (err) {
		next(err);
	}
}

export async function getCourses(req, res, next) {
	try {
		const data = await getCoursesRecords(req.body);
		return sendSuccess(res, 200, data, "all courses loaded");
	} catch (err) {
		next(err);
	}
}