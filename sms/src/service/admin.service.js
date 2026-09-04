import { createAdmin as createAdminRecords } from "../models/admin.model.js";
import { findUserbyEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function registerAdmin({ email, password, firstName, lastName }) {
	const isExisting = await findUserbyEmail({ email });
	if (isExisting) fail("this email already exists", 409);

	const hashedPassword = await bcrypt.hash(password, 10);

	const { user, admin } = await createAdminRecords({
		email,
		hashedPassword,
		firstName,
		lastName,
	});

	delete user.hashedPassword;
	return { user, admin };
}
