import {
	createAcademicSessionServiceService,
	getAcademicSessionService,
} from "../service/academicSession.service.js";
import { sendSuccess } from "../utils/response.js";

export async function createAcademicSessionController(req, res, next) {
	try {
		const data = await createAcademicSessionServiceService(req.body);
		return sendSuccess(res, 201, data, "academic session created successfully");
	} catch (err) {
		next(err);
	}
}

export async function getAcademicSessionController(req, res, next) {
	try {
		const data = await getAcademicSessionService(req.body);
		return sendSuccess(res, 200, data, "all the academic sessions");
	} catch (err) {
		next(err);
	}
}
