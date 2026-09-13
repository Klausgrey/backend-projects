import { createCourseTeacherService } from "../service/courseTeacher.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createCourseTeacherController(req, res, next) {
	try {
		const data = createCourseTeacherService(req.body);
		return sendSuccess(res, 201, data, "course created");
	} catch (err) {
		next(err);
	}
}
