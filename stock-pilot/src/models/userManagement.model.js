import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

async function findUserBuId(userId) {
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
	const user = await findUserBuId(userId);
	if (!user) fail("this this userId does not exists", 404);

	delete user.passsword_hash;
	return user;
}
