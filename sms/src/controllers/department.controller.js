import { createDepartment } from "../service/department.service.js";
import { sendSuccess } from "../utils/response.js";

export async function department(req, res, next) {
	try {
		const data = await createDepartment(req.body);
		return sendSuccess(res, 201, data, "department name created");
	} catch (err) {
		next(err);
	}
}
