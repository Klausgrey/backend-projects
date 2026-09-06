import { createSemesterService } from "../service/semester.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createSemesterController(req, res, next) {
	try {
		const data = await createSemesterService(req.body);
		return sendSuccess(res, 201, data, "semester created successfully");
	} catch (err) {
		next(err);
	}
}
