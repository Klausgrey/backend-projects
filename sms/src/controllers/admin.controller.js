import { sendSuccess } from "../utils/response.js";
import { registerAdmin as register } from "../service/admin.service.js";

export async function registerAdmin(req, res, next) {
	try {
		const result = await register(req.body);
		return sendSuccess(res, 201, result, "admin registered successfully");
	} catch (err) {
		next(err);
	}
}
