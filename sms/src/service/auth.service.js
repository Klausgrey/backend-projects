import { findUserbyEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

// export async function register() {}

export async function loginUser({ email, password }) {
	const user = await findUserbyEmail({ email });
	if (!user) fail("user with this email does not exists", 401);

	const match = await bcrypt.compare(password, user.hashedPassword);
	if (!match) fail("incorrect password", 401);

	const payload = {
		id: user.id,
		role: user.role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION_TIME,
	});
	delete user.hashedPassword;

	return { user, token };
}
