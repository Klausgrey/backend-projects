import { loginUser } from "../service/auth.service.js";
import { sendSuccess } from "../utils/response.js";

export async function login(req, res, next) {
	try {
		const result = await loginUser(req.body);
		return sendSuccess(res, 200, result, "user logged in successfully");
	} catch (err) {
		next(err);
	}
}
