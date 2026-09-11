import { createCourseService } from "../service/course.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createCourseController(req, res, next) {
	try {
		const { departmentId, levelId, capacity } = req.body;
		const data = await createCourseService({ departmentId, levelId, capacity });
		return sendSuccess(res, 201, data, "course created successfully");
	} catch (err) {
		next(err);
	}
}
