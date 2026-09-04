import {
	createDepartment,
	getDepartments as getDepartmentRecords,
} from "../service/department.service.js";
import { sendSuccess } from "../utils/response.js";

export async function department(req, res, next) {
	try {
		const data = await createDepartment(req.body);
		return sendSuccess(res, 201, data, "department name created");
	} catch (err) {
		next(err);
	}
}

export async function getDepartments(req, res, next) {
	try {
		const data = await getDepartmentRecords(req.body);
		return sendSuccess(res, 200, data, "all departments loaded");
	} catch (err) {
		next(err);
	}
}
