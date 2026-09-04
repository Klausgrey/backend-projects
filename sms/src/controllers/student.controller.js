import { createStudent as createStudentRecord } from "../service/student.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createStudent(req, res, next) {
	try {
		const data = await createStudentRecord(req.body);
		return sendSuccess(res, 201, data, "student created succeessfully");
	} catch (err) {
		next(err);
	}
}
