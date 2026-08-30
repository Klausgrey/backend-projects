import { findUserbyEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function register() {}

export async function loginUser({ email, password }) {
	if (!email || !password) throw new Error("email and password are required");

	const user = await findUserbyEmail(email);
	if (!user) throw new Error("user with this email does not exists");

	const match = await bcrypt.compare(password, user.hashedPassword);
	if (!match) throw new Error("incorrect password");

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
