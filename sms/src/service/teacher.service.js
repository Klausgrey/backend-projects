import { createTeacher as createTeacherRecord } from "../models/teacher.model.js";
import { findUserbyEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function createTeacher({ email, password, firstName, lastName }) {
	const isExisting = await findUserbyEmail({ email });
	if (isExisting) fail("this email already exists", 406);

	const hashedPassword = await bcrypt.hash(password, 10);

	const { user, teacher } = await createTeacherRecord({
		email,
		hashedPassword,
		firstName,
		lastName,
	});

	delete user.hashedPassword;
	return { user, teacher };
}
