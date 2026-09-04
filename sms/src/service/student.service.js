import { createStudent as createStudentRecord } from "../models/student.model.js";
import { findUserbyEmail } from "./user.model.js";
import bcrypt from "bcrypt";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function createStudent({ email, password, firstName, lastName }) {
	const isExisting = await findUserbyEmail({ email });
	if (isExisting) fail("this email already exisits", 409);

	const hashedPassword = await bcrypt.hash(password, 10);

	const { user, student } = await createStudentRecord({
		email,
		hashedPassword,
		firstName,
		lastName,
	});

	delete user.hashedPassword;
	return { user, student };
}
