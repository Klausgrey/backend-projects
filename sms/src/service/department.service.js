import {
	createDepartment as createDepartmentName,
	findDepartmentById,
} from "../models/department.model.js";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function createDepartment({ name }) {
	if (!name) fail("there was no nane provided", 400);
	const isExisting = await findDepartmentById({ name });
	if (isExisting) fail("this department already exists", 409);

	const data = await createDepartmentName({ name });
	return { data };
}
