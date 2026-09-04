import {
	createLevel as createLevelRecord,
	getLevels as getLevelRecords,
} from "../models/level.model.js";
import { sendSuccess } from "../utils/response.js";

export async function createLevel(req, res, next) {
	try {
		const data = await createLevelRecord(req.body);
		return sendSuccess(res, 201, data, "level created successfully");
	} catch (err) {
		next(err);
	}
}

export async function getLevels(req, res, next) {
	try {
		const data = await getLevelRecords(req.body);
		return sendSuccess(res, 200, data, "all levels loaded");
	} catch (err) {
		next(err);
	}
}
