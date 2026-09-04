import { createLevel as createLevelRecord } from "../models/level.model.js";
import { sendSuccess } from "../utils/response.js";

export async function createLevel(req, res, next) {
	try {
		const data = await createLevelRecord(req.body);
		return sendSuccess(res, 201, data, "level created successfully");
	} catch (err) {
		next(err);
	}
}
