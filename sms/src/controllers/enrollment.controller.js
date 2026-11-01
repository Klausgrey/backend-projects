import { createEnrollmentService } from "../service/enrollment.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createEnrollmentController(req, res, next) {
	try {
		const data = await createEnrollmentService(req.body);
		return sendSuccess(res, 201, data, "enrollment created successfully");
	} catch (err) {
		next(err);
	}
}
