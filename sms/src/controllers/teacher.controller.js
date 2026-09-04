import { createTeacher as createTeacherRecord } from "../service/teacher.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createTeacher(req, res, next) {
	try {
		const data = await createTeacherRecord(req.body)
		return sendSuccess(res, 201, data, "teacher created successfully")
	} catch (err) {
		next(err)
	}
}
