import pool from "../config/db.js";
import bcrypt from "bcrypt";

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
		rows: [users],
	} = await pool.query(
		`insert into users
		(first_name, last_name, email, password_hash, phone_number)
		values ($1, $2, $3, $4, $5) returning *`,
		[firstName, lastName, email, password, phoneNumber],
	);

	delete users.password_hash;
	return users;
}
