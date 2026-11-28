import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

export async function createSuppliers({ name, email, phone, address }) {
	const {
		rows: [isExisiting],
	} = await pool.query(
		`
	select *
	from suppliers
	where email = $1 and phone = $2
		`,
		[email, phone],
	);

	if (isExisiting)
		fail("This supplier witht this email and phone number already exists", 409);

	const {
		rows: [supplier],
	} = await pool.query(
		`
		insert into suppliers (name, email, phone, address)
		values ($1, $2, $3, $4)
		returning *
		`,
		[name, email, phone, address],
	);

	return supplier;
}

export async function getSuppliers() {
	const { rows } = await pool.query(`
		select *
	from suppliers
	order by desc
		`);

	return rows;
}
export async function getSuppliersId({ id }) {
	const {
		rows: [supplier],
	} = await pool.query(
		`
		select *
	from suppliers
	order by desc
	where id = $1
		`,
		[id],
	);
	if (!supplier) fail(`this supplier with the ${id} does not exists`, 404);

	return supplier;
}

export async function updateSuppliersInfo(
	id,
	{ name, email, phone, address, isActive },
) {
	const {
		rows: [supplier],
	} = await pool.query(
		`
	update suppliers
	set name = coalesce($1, name),
	email = coalesce($2, email),
	phone = coalesce($3, phone),
	address = coalesce($4, address),
	is_active = coalesce($5, is_active)
	where id = $6
	returning *
		`,
		[
			name ?? null,
			email ?? null,
			phone ?? null,
			address ?? null,
			isActive ?? null,
			id,
		],
	);

	if (!supplier) fail(`this id ${id} does not exists`, 404);

	return supplier;
}
