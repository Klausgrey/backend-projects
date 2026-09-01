import { createAdmin as createAdminRecords, findUserbyEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";


function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function registerAdmin({ email, password, firstName, lastName }) {
	if ((!email || !password || !firstName || !lastName))
		fail("all fields are required", 400);

	const isExisting = await findUserbyEmail(email);
	if (isExisting) fail("this email already exists", 409);

	const hashedPassword = await bcrypt.hash(password, 10);

	const admin = await createAdminRecords(email, hashedPassword, firstName, lastName);

	return { admin };
}
