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
	if (rows[0] === 0) fail("there is no category created", 404);

	return rows;
}

export async function getCategoriesById(id) {
	const {
		rows: [category],
	} = await pool.query(
		sql`
		select id, name, description
		from categories
		where id = $1
		`,
		[userId],
	);
	if (!category) fail("there is no category with this id", 404);

	return category;
}

export async function updateCategoriesById(id, name, description) {
	const category = await pool.query(
		sql`
		select id
		from categories
		where id = $1
		`,
		[id],
	);
	if (!category) fail("this category with this id does not exists", 404);

	const {
		rows: [updatedCategory],
	} = await pool.query(
		sql`update categories
		set name = coalesce($1, name),
		description = coalesce($2, description)
		where id = $3
		returning id, name, description
		`,
		[name ?? null, description ?? null, id],
	);

	return updatedCategory;
}

export async function updateCategoriesStatus(id, isActive) {
	// const {
	// 	rows: [category],
	// } = await pool.query(
	// 	sql`
	// 	select c.id, p.category_id
	// 	from categories as c
	// 	join products as p
	// 	on c.id = p.category_id
	// 	where c.id = $1
	// 	`,
	// 	[id],
	// );
	// if (!category) fail("this category with this id does not exists", 404);
	// else if (category)
	// 	fail(
	// 		"there is a product attached to this category and cannot be deleted",
	// 		409,
	// 	);
	// else await pool.query(
	// 	sql`
	// 	delete from categories
	// 	where id = $1
	// 	`,
	// 	[id],
	// );

	const {
		rows: [category],
	} = await pool.query(
		sql`
		update categories
		set is_active = $1
		where id = $2
		returning id, name, description, is_active
		`,
		[isActive, id],
	);

	if (!category) fail("this category does nto exists", 404);

	return category;
}
