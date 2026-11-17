import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fail } from "../helpers/errors.js";
import "dotenv/config";

async function findUserById(userId) {
	const {
		rows: [user],
	} = await pool.query(
		`
		select id, first_name, password_hash, last_name, email, is_active
		from users
		where id = $1
		`,
		[userId],
	);
	return user;
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
		select id, first_name, last_name, email, password_hash, role
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

	delete user.password_hash;
	return { token, user };
}

export async function getCurrentUser({ userId }) {
	const user = await findUserById(userId);
	if (!user) fail("user does not exists", 401);
	delete user.password_hash;
	return user;
}

export async function changeUserPassword({
	userId,
	currentPassword,
	newPassword,
}) {
	const user = await findUserById(userId);

	if (!user.is_active) {
		fail("Account is disabled", 403);
	}

	if (!user) fail("unknown user", 404);

	const match = await bcrypt.compare(currentPassword, user.password_hash);
	if (!match) fail("current password is incorrect", 400);

	if (currentPassword === newPassword)
		fail("New password must be different from current password", 400);

	const passwordHash = await bcrypt.hash(newPassword, 10);

	await pool.query(
		`
		update users
		set password_hash = $1
		where id = $2
		`,
		[passwordHash, userId],
	);
	// delete user.password_hash;
}

export async function logoutUser({ userId }) {
	const user = await findUserById(userId);
	if (!user) fail("this user does not exists", 404);
	


	delete user.password_hash;
	return user;
}
