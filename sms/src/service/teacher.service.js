import { createTeacher as createTeacherRecord } from "../models/teacher.model.js";
import { findUserbyEmail } from "../models/user.model.js";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function createTeacher({
	email,
	hashedpassword,
	firstName,
	LastName,
}) {
	const isExisting = await findUserbyEmail({ email });
	if (isExisting) fail("this email already exists", 406);

	const { user, teacher } = await createTeacherRecord({
		email,
		hashedpassword,
		firstName,
		LastName,
	});

	delete user.hashedPassword;
	return { user, teacher };
}
