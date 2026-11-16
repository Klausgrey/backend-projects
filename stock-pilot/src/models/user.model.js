import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

function fail(message, statusCode) {
	const error = new Error(message);
	error.statusCode = statusCode;
	throw error;
}

export async function createUsers({
	firstName,
	lastName,
	email,
	passwordHash,
	phoneNumber,
}) {
	const password = await bcrypt.hash(passwordHash, 10);
	const {
		rows: [existing],
	} = await pool.query(
		`select email from users
		where email = $1`,
		[email],
	);

	if (existing) fail("this users email already exists", 409);

	const {
		rows: [user],
	} = await pool.query(
		`insert into users
		(first_name, last_name, email, password_hash, phone_number)
		values ($1, $2, $3, $4, $5) returning *`,
		[firstName, lastName, email, password, phoneNumber],
	);

	delete user.password_hash;
	return user;
}

export async function loginUser({ email, passwordHash }) {
	const {
		rows: [user],
	} = await pool.query(
		`
		select id, email, password_hash, role
		from users
		where email = $1
		`,
		[email],
	);

	if (!user) fail("this users email is registered on the database", 404);
	const isValid = await bcrypt.compare(passwordHash, user.password_hash);
	if (!isValid) fail("incorrect password", 400);

	const payload = {
		userId: user.id,
		role: user.role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	delete user.password_hash
	return { user, token };
}
