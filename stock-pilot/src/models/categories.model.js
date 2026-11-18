import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

export async function createCategories(name, description) {
	const {
		rows: [isExisting],
	} = await pool.query(
		sql`
		select id
		from categories
		where lower(name) = lower($1)
		`,
		[name],
	);
	if (isExisting) fail("this category already exists", 409);

	const category = await pool.query(
		sql`
		insert into categories (name, description)
		value ($1, $2) returning id, name, description, created_at
		`,
		[name, description ?? null],
	);

	return category;
}

export async function getAllCategories() {
	const { rows } = await pool.query(
		sql`
		select *
		from categories
		`,
	);
	if (rows[0] === 0) fail("there is no category created");

	return rows;
}
