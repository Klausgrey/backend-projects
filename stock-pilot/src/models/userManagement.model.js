import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

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

export async function getAllUsers() {
	const { rows } = await pool.query(
		`
		select id, first_name, last_name, email, role, is_active, created_at
		from users
		where role = 'staff'
		order by created_at desc
		`,
	);

	return rows;
}

export async function getUserById(userId) {
	const user = await findUserById(userId);
	if (!user) fail("this userId does not exists", 404);

	delete user.password_hash;
	return user;
}

export async function updateUserById(userId, { firstName, lastName, email }) {
	const user = await findUserById(userId);
	if (!user) fail("this userId does not exist");

	const {
		rows: [updateUser],
	} = await pool.query(
		`
		update users
		set first_name = coalesce($1, first_name),
		last_name = coalesce($2, last_name),
		email = coalesce($3, email)
		where id = $4 and role = 'staff'
		returning id, first_name, last_name, email, role, is_active, created_at
		`,
		[firstName ?? null, lastName ?? null, email ?? null, userId],
	);

	return updateUser;
}

export async function upadateUserStatus(userId, isActive) {
	const user = await findUserById(userId);
	if (!user) fail("this userId does not exist");

	const {
		rows: [updated],
	} = await pool.query(
		`
		update users
		set is_active = $1
		where id = $2 and role = 'staff'
		returning first_name, last_name, email, is_active
		`,
		[isActive, userId],
	);

	return updated;
}
